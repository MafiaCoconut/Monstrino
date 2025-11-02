import asyncio
import dataclasses
from datetime import datetime
import os
import re
import time
import unicodedata
from typing import Optional
import json
import aiohttp
import logging

from icecream import ic
from monstrino_models.dto import ParsedRelease
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_releases_port import ParseReleasesPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchiveReleasesParser(ParseReleasesPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.batch_size = 10
        self.sleep_between_requests = 5
        self.source_name = "mh-archive"
        self.debug_mode = False

    async def parse(self, ):
        for year in range(2019, 2009, -1):
            start_time = datetime.now()

            logger.info(f"Starting parsing year: {year}")


            html = await Helper.get_page(self.domain_url + f'/category/release-dates/{year}/')
            # await Helper.save_page_in_file(html)
            releases = await self._parse_links(html)
            logger.info(f"Found releases count: {len(releases)} for year: {year}")

            # if self.debug_mode:
            #     release = [ParsedRelease(
            #         name="Test doll",
            #         source="test",
            #         link="https://mhcollector.com/skulltimate-secrets-hauntlywood-clawdeen-wolf/"
            #         # link = "https://mhcollector.com/deadfast-ghoulia-yelps-2024/" # from the box
            #         # link = "https://mhcollector.com/draculaura-and-clawdeen-wolf-eeekend-getaway/"
            #         # link = "https://mhcollector.com/day-out-3-pack/"
            #         # link = "https://mhcollector.com/draculaura-bite-in-the-park/"  # 2 pets
            #         # link = "https://mhcollector.com/dawn-of-the-dance-lagoona-blue-reissue/"
            #         # link = "https://mhcollector.com/skulltimate-secrets-neon-frights-draculaura/"
            #         # link = "https://mhcollector.com/vinyl-count-fabulous/"
            #         # link = "https://mhcollector.com/original-ghouls-collection-6-pack/" # 6 characters and reissues
            #         # link = "https://mhcollector.com/freaky-fusion-catacombs/"
            #         # link = "https://mhcollector.com/freaky-fusion-save-frankie-jackson-jekyll/"
            #         #
            #     )]
            #     await self._parse_release_info(release[0])
            #     yield release
            #     return

            logger.info(f"Start processing info for every release")
            last_return_release_index = 0

            for i in range(1, len(releases) + 1):
                await self._parse_release_info(releases[i - 1])

                if i % self.batch_size == 0:
                    logger.info(f"Returning batch: {i - self.batch_size} - {i}")
                    yield releases[i - self.batch_size: i]
                    last_return_release_index = i
                    await asyncio.sleep(self.sleep_between_requests)

            if not self.debug_mode:
                if last_return_release_index < len(releases):
                    logger.info(f"Returning batch: {last_return_release_index} - {len(releases)}")
                    yield releases[last_return_release_index:]
                await asyncio.sleep(self.sleep_between_requests)
            end_time = datetime.now()
            logger.info(f"Finished parsing year: {year} in {end_time - start_time}")

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
                link=link,
                source=self.source_name
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
                    dto.characters = stats[key]
                case "Series":
                    dto.series_name = stats[key]
                case "Type":
                    dto.type_name = stats[key]
                case "Gender":
                    dto.gender = stats[key]
                case "Multi-Pack":
                    dto.multi_pack = stats[key]
                case "Released":
                    dto.year = stats[key]
                case "Exclusiveof":
                    dto.exclusive_of_names = stats[key]
                case "Reissue of":
                    dto.reissue_of = stats[key]
                case "Model Number":
                    dto.mpn = stats[key]
                case "Pet":
                    dto.pet_names = stats[key]
                case "Gallery":
                    dto.images_link = self.domain_url + stats["Gallery"][0]['link']
                case _:
                    if dto.extra is None:
                        dto.extra = []
                    dto.extra.append({key: stats[key]})
        try:
            dto.images = await self._get_images(self.domain_url + stats["Gallery"][0]['link'])
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
