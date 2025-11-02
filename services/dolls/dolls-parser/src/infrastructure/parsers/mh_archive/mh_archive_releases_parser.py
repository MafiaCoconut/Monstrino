import asyncio
import dataclasses
import os
import re
import time
import unicodedata
from typing import Optional

import aiohttp
import logging

from icecream import ic
from monstrino_models.dto import ParsedRelease
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_releases_port import ParseReleasesPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class ReleasesParser(ParseReleasesPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.batch_size = 10

    async def parse(self, ):
        for year in range(2014, 2009, -1):

            logger.info(f"Starting parsing year: {year}")


            html = await Helper.get_page(self.domain_url + f'/category/release-dates/{year}/')
            # await Helper.save_page_in_file(html)
            releases = await self._parse_links(html)
            logger.info(f"Found releases count: {len(releases)} for year: {year}")

            # await self._parse_release_info(ParsedReleaseDTO(
            #     # link="https://mhcollector.com/skulltimate-secrets-hauntlywood-clawdeen-wolf/"
            # # link = "https://mhcollector.com/deadfast-ghoulia-yelps-2024/" # from the box
            # # link = "https://mhcollector.com/draculaura-and-clawdeen-wolf-eeekend-getaway/"
            # # link = "https://mhcollector.com/day-out-3-pack/"
            # # link = "https://mhcollector.com/draculaura-bite-in-the-park/"  # 2 pets
            # # link = "https://mhcollector.com/dawn-of-the-dance-lagoona-blue-reissue/"
            # # link = "https://mhcollector.com/skulltimate-secrets-neon-frights-draculaura/"
            # # link = "https://mhcollector.com/vinyl-count-fabulous/"
            # # link = "https://mhcollector.com/original-ghouls-collection-6-pack/" # 6 characters and reissues
            # # link = "https://mhcollector.com/freaky-fusion-catacombs/"
            # # link = "https://mhcollector.com/freaky-fusion-save-frankie-jackson-jekyll/"
            # #
            # ))

            last_return_release_index = 0

            for i in range(1, len(releases) + 1):
                await self._parse_release_info(releases[i - 1])

                if i % self.batch_size == 0:
                    logger.info(f"Returning batch: {i - self.batch_size} - {i}")
                    yield releases[i - self.batch_size: i]
                    await asyncio.sleep(2)

                    last_return_release_index = i

            if last_return_release_index < len(releases):
                logger.info(f"Returning batch: {last_return_release_index} - {len(releases)}")
                yield releases[last_return_release_index:]
            await asyncio.sleep(10)

    async def _parse_links(self, html: str):
        soup = BeautifulSoup(html, "html.parser")
        links = set()

        for div in soup.find_all("div", class_="cat_div_three"):
            a = div.find("h3").find("a")
            if a and a.get("href"):
                href = a["href"].strip()
                if href.startswith("https://mhcollector.com/") and "/category/" not in href:
                    links.add(href)

        result = []
        for link in links:
            result.append(ParsedRelease(
                link=link
            ))
        return result

    async def _parse_release_info(self, dto: ParsedRelease):
        logger.info("------------------------------------")
        logger.info(f"Parsing release link: {dto.link}")
        html = await Helper.get_page(dto.link)

        soup = BeautifulSoup(html, "html.parser")

        name = await self._get_release_name(soup)
        desc_html = await self._get_release_description_html(soup)
        primary_image = await self._get_prime_image(soup)
        from_the_box = await self._get_from_the_box(soup)
        stats = await self._get_stats_dict_v5(soup)

        dto.name = name
        dto.description = desc_html
        dto.primary_image = primary_image
        dto.from_the_box_text = from_the_box
        dto.original_html_content = html
        for key in stats.keys():
            match key:
                case "Character":
                    dto.characters = str(stats[key])
                case "Series":
                    dto.series_name = str(stats[key])
                case "Type":
                    dto.type_name = str(stats[key])
                case "Gender":
                    dto.gender = str(stats[key])
                case "Multi-Pack":
                    dto.multi_pack = str(stats[key])
                case "Released":
                    dto.year = str(stats[key])
                case "Exclusiveof":
                    dto.exclusive_of_names = str(stats[key])
                case "Reissue of":
                    dto.reissue_of = str(stats[key])
                case "Model Number":
                    dto.mpn = str(stats[key])
                case "Pet":
                    dto.pet_names = str(stats[key])
                case "Gallery":
                    dto.images_link = self.domain_url + stats["Gallery"][0]['link']
                case _:
                    dto.extra += f'"{key}": {stats[key]}'
        try:
            dto.images = str(await self._get_images(self.domain_url + stats["Gallery"][0]['link']))
        except Exception as e:
            logger.error("Error while getting images: " + str(e))

    @staticmethod
    async def _get_release_name(soup: BeautifulSoup) -> str:
        h1 = soup.find("h1")
        return h1.get_text(strip=True) if h1 else None

    @staticmethod
    async def _get_release_description_html(soup: BeautifulSoup) -> str:
        column = soup.find("div", class_="column_1")
        if not column:
            return ""
        # Берем все <p> до блока stats
        parts = []
        for p in column.find_all("p"):
            # Останавливаемся, если начинается голубой блок
            if p.find_previous_sibling("div", class_="stats"):
                break
            parts.append(str(p))
        return "\n".join(parts)

    @staticmethod
    async def _get_stats_dict_v1(soup: BeautifulSoup) -> dict[str, dict[str, str]]:
        stats_block = soup.find("div", class_="stats")
        result = {}

        if not stats_block:
            return result

        # каждый <ul> = один параметр (например Character, Series, Released, Gallery)
        for ul in stats_block.find_all("ul"):
            items = ul.find_all("li")
            if len(items) >= 2:
                key = items[0].get_text(strip=True).rstrip(":")
                value_elem = items[1]
                link = None
                text = value_elem.get_text(strip=True)
                a = value_elem.find("a")
                if a and a.get("href"):
                    link = a["href"]
                result[key] = {"text": text, "link": link}
        return result

    @staticmethod
    async def _get_stats_dict_v2(soup: BeautifulSoup) -> dict[str, list[dict[str, str]]]:
        stats_block = soup.find("div", class_="stats")
        result: dict[str, list[dict[str, str]]] = {}

        if not stats_block:
            return result

        # перебираем все ul внутри блока
        for ul in stats_block.find_all("ul"):
            items = ul.find_all("li")
            if len(items) < 2:
                continue

            # определяем ключ (до двоеточия)
            key_raw = items[0].get_text(strip=True)
            key = key_raw.split(":", 1)[0].strip()

            # если элемент — служебная ссылка вроде "Exclusive"
            # и в названии есть "of:", то ключ остаётся как есть
            if not key:
                continue

            value_elem = items[1]
            a = value_elem.find("a")

            # собираем значение
            text = value_elem.get_text(strip=True)
            link = a["href"] if a and a.get("href") else None

            # фильтруем "служебные" ссылки — если в ссылке есть "/category/exclusives/"
            # и это просто базовая ссылка, игнорируем
            if link and link.strip().endswith("/category/exclusives/"):
                link = None

            value_dict = {"text": text, "link": link}

            # добавляем в список, если ключ уже встречался
            if key in result:
                result[key].append(value_dict)
            else:
                result[key] = [value_dict]

        return result

    @staticmethod
    async def _get_stats_dict_v3(soup: BeautifulSoup) -> dict[str, list[dict[str, str]]]:
        stats_block = soup.find("div", class_="stats")
        result: dict[str, list[dict[str, str]]] = {}

        if not stats_block:
            return result

        for ul in stats_block.find_all("ul"):
            items = ul.find_all("li")
            if len(items) < 2:
                continue

            # Определяем ключ (всё до двоеточия)
            key_raw = items[0].get_text(strip=True)
            key = key_raw.split(":", 1)[0].strip()
            if not key:
                continue

            # Собираем все значения в этом <ul>
            values = []
            for value_elem in items[1:]:
                # Пропускаем пустые или служебные
                text = value_elem.get_text(strip=True)
                if not text or text == ",":
                    continue

                a = value_elem.find("a")
                link = a["href"] if a and a.get("href") else None

                # Игнорируем служебные ссылки вроде /category/exclusives/
                if link and link.strip().endswith("/category/exclusives/"):
                    link = None

                values.append({"text": text, "link": link})

            # Если ключ уже есть — добавляем новые значения
            if key in result:
                result[key].extend(values)
            else:
                result[key] = values

        return result

    @staticmethod
    async def _get_stats_dict_v4(soup: BeautifulSoup) -> dict[str, list[dict[str, str]]]:
        stats_block = soup.find("div", class_="stats")
        result: dict[str, list[dict[str, str]]] = {}

        if not stats_block:
            return result

        # Берём только верхнеуровневые <ul> (не вложенные)
        for ul in stats_block.find_all("ul", recursive=False):
            items = ul.find_all("li", recursive=False)
            if len(items) < 2:
                continue

            key_raw = items[0].get_text(strip=True)
            key = key_raw.split(":", 1)[0].strip()
            if not key:
                continue

            values = []
            for value_elem in items[1:]:
                text = value_elem.get_text(strip=True)
                if not text or text == ",":
                    continue

                a = value_elem.find("a")
                link = a["href"] if a and a.get("href") else None
                if link and link.strip().endswith("/category/exclusives/"):
                    link = None

                values.append({"text": text, "link": link})

            if key in result:
                result[key].extend(values)
            else:
                result[key] = values

        return result

    @staticmethod
    async def _get_stats_dict_v5(soup: BeautifulSoup) -> dict[str, list[dict[str, str]]]:
        stats_block = soup.find("div", class_="stats")
        result: dict[str, list[dict[str, str]]] = {}

        if not stats_block:
            return result

        # Берём все <ul> внутри stats, включая вложенные
        all_uls = stats_block.find_all("ul")

        for ul in all_uls:
            # если ul вложен внутрь другого ul — обрабатываем его отдельно
            parent = ul.find_parent("ul")
            if parent and parent in all_uls:
                # искусственно «отсоединяем» этот ul от родителя
                parent.extract()

            items = ul.find_all("li", recursive=False)
            if len(items) < 2:
                continue

            key_raw = items[0].get_text(strip=True)
            key = key_raw.split(":", 1)[0].strip()
            if not key:
                continue

            values = []
            for value_elem in items[1:]:
                text = value_elem.get_text(strip=True)
                if not text or text == ",":
                    continue

                a = value_elem.find("a")
                link = a["href"] if a and a.get("href") else None

                # игнорируем техническую ссылку /category/exclusives/
                if link and link.strip().endswith("/category/exclusives/"):
                    link = None

                values.append({"text": text, "link": link})

            if key in result:
                result[key].extend(values)
            else:
                result[key] = values

        return result

    @staticmethod
    async def _get_from_the_box(soup: BeautifulSoup) -> str | None:
        box_div = soup.find("div", class_="from_the_box")
        if not box_div:
            return None
        return str(box_div)

    @staticmethod
    async def _get_prime_image(soup: BeautifulSoup) -> str | None:
        key_note = soup.find("div", class_="key_note")
        if not key_note:
            return None

        # Ищем предшествующее изображение (оно находится выше блока key_note)
        img = key_note.find_previous("img")
        if img and img.get("src"):
            return img["src"]
        return None

    @staticmethod
    async def _get_images(link: str):
        html = await Helper.get_page(link)
        # await Helper.save_page_in_file(html)

        soup = BeautifulSoup(html, "html.parser")

        gallery = soup.find("div", class_="gallery")
        if not gallery:
            return []

        image_urls: list[str] = []

        # каждая картинка внутри <div class="gallery-item"><a><img ... /></a>
        for img in gallery.find_all("img"):
            # 1. Пытаемся взять оригинальный размер из srcset (последний)
            srcset = img.get("srcset")
            if srcset:
                # srcset = "url1 150w, url2 768w, url3 1000w"
                parts = [p.strip().split(" ")[0] for p in srcset.split(",")]
                if parts:
                    image_urls.append(parts[-1])
                    continue

            # 2. Если srcset нет — используем обычный src
            src = img.get("src")
            if src:
                image_urls.append(src)

        return image_urls

    # @staticmethod
    # async def _get_gallery_link(soup: BeautifulSoup) -> str | None:
    #     stats = _get_stats_dict(soup)
    #     gallery = stats.get("Gallery")
    #     return gallery["link"] if gallery else None
