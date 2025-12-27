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

from application.ports.parse.parse_release_port import ParseReleasePort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchiveReleasesParser(ParseReleasePort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.sleep_between_requests = 5
        self.source_name = "mh-archive"
        self.debug_mode = False

    async def parse(self, year_start: int = 2025, year_end: int = 2024, batch_size: int = 10, limit: int = 9999999):
        """
        FLOW
        1. Iterate years from year_start to year_end
        2. Open page with list of all releases for year
        3. Process link to every release on page
        4. Iterate every release link and parse info
        5. Return batch
        6. Repeat for next year
        """
        logger.info(f"============== Starting releases parser ==============")

        # Step 1
        for year in range(year_start, year_end, -1):
            start_time = datetime.now()

            logger.info(f"Starting parsing year: {year}")

            # Step 2
            html = await Helper.get_page(self.domain_url + f'/category/release-dates/{year}/')

            # Step 3
            list_of_release_links = await self._parse_links(html)
            logger.info(f"Found release count: {len(list_of_release_links)} for year: {year}")

            for i in range(0, len(list_of_release_links), batch_size):
                if i >= limit:
                    break

                if i + batch_size > len(list_of_release_links):
                    batch_last_index = len(list_of_release_links)
                elif i + batch_size > limit:
                    batch_last_index = limit
                else:
                    batch_last_index = i + batch_size

                logger.info(f"Processing batch: {i}-{batch_last_index}")
                batch = list_of_release_links[i: batch_last_index]

                tasks = [self._parse_release_info(p) for p in batch]
                batch_results = await asyncio.gather(*tasks, return_exceptions=True)
                yield batch_results

                logger.info(f"Waiting sleep time: {self.sleep_between_requests} seconds")
                await asyncio.sleep(self.sleep_between_requests)

            end_time = datetime.now()
            logger.info(f"Finished parsing year: {year} in {end_time - start_time}")

    async def parse_link(self, link: str) -> Optional[ParsedRelease]:
        return await self._parse_release_info(link)

    async def _parse_links(self, html: str) -> list[str]:
        soup = BeautifulSoup(html, "html.parser")
        links = set()

        for div in soup.find_all("div", class_="cat_div_three"):
            a = div.find("h3").find("a")
            if a and a.get("href"):
                href = a["href"].strip()
                if href.startswith(self.domain_url) and "/category/" not in href:
                    links.add(href)

        result = []
        for link in links:
            result.append(link)
        return result

    # async def _parse_release_info(self, dto: ParsedRelease):
    async def _parse_release_info(self, link: str) -> Optional[ParsedRelease]:
        logger.info("------------------------------------")
        logger.info(f"Parsing release link: {link}")
        html = await Helper.get_page(link)

        soup = BeautifulSoup(html, "html.parser")

        name = await self._get_release_name(soup)
        desc_html = await self._get_release_description_html(soup)
        primary_image = await self._get_prime_image(soup)
        from_the_box = await self._get_from_the_box(soup)
        stats = await self._get_stats_dict_v5(soup)
        # ---------- Main Attributes ----------
        dto = ParsedRelease(
            name=name,
            description_raw=desc_html,
            primary_image=primary_image,
            from_the_box_text_raw=from_the_box,
            # original_html_content=html, # TODO УБРАТЬ КОММЕНТАРИЙ
            link=link,
        )
        for key in stats.keys():
            match key:
                case "Character":
                    dto.characters_raw = stats[key]
                case "Series":
                    dto.series_raw = stats[key]
                case "Type":
                    dto.content_type_raw = stats[key]
                case "Gender":
                    dto.gender_raw = stats[key]
                case "Multi-Pack":
                    dto.pack_type_raw = stats[key]
                case "Released":
                    dto.year = int(stats[key][0])
                    dto.year_raw = stats[key][0]
                case "Exclusiveof":
                    dto.exclusive_vendor_raw = stats[key]
                case "Reissue of":
                    dto.reissue_of_raw = stats[key]
                case "Model Number":
                    dto.mpn = stats[key][0]
                case "Pet":
                    dto.pet_names_raw = stats[key]
                case "Gallery":
                    dto.images_link = self.domain_url + stats["Gallery"][0]
                case "Doll Type":
                    dto.tier_type_raw = stats[key][0]
                case _:
                    if dto.extra is None:
                        dto.extra = []
                    dto.extra.append({key: stats[key]})
        try:
            dto.images = await self._get_images(self.domain_url + stats["Gallery"][0])
        except Exception as e:
            logger.error("Error while getting images: " + str(e))

        blocked_content_types = ["Minis", "Fash’ems", "Plush", "Keychain", "Pins", "Accessories", "Inner Monster", "Mega Bloks", "Monster Pen", "Ornaments", "Rock Candy", "Scary Cute Figures"]
        if any(content_type in blocked_content_types for content_type in dto.content_type_raw):
            return None
        return dto

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
    # async def _get_stats_dict_v5(soup: BeautifulSoup) -> dict[str, list[dict[str, str]]]:
    async def _get_stats_dict_v5(soup: BeautifulSoup) -> dict[str, list[str]]:
        stats_block = soup.find("div", class_="stats")
        result: dict[str, list[str]] = {}
        # result: dict[str, list[dict[str, str]]] = {}

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

            if key == "Gallery":
                value_elem = items[1]
                a = value_elem.find("a")
                link = a["href"] if a and a.get("href") else None
                result["Gallery"] = [link]

            values = []
            for value_elem in items[1:]:
                text = value_elem.get_text(strip=True)
                if not text or text == ",":
                    continue
                text = text.replace('\u200e', '')
                text = text[1:] if text[0] == ',' else text
                text = text[1:] if text[0] == ' ' else text
                # a = value_elem.find("a")
                # link = a["href"] if a and a.get("href") else None
                #
                # # игнорируем техническую ссылку /category/exclusives/
                # if link and link.strip().endswith("/category/exclusives/"):
                #     link = None

                values.append(text)

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
