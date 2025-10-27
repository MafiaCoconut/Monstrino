import dataclasses
import os
import re
import time
import unicodedata
from typing import Optional

import aiohttp
import logging

from icecream import ic
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_characters_port import ParseCharactersPort
from domain.entities.parsed_character_dto import ParsedCharacterDTO
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class CharactersParser(ParseCharactersPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")

        self.batch_size = 10

    async def parse(self, ) -> None:
        pass

    async def parse_ghouls(self):
        html = await Helper.get_page(self.domain_url + '/category/characters/ghouls/')
        list_of_ghouls = await self._parse_characters_list(html, "ghoul")
        logger.info(f"Found ghouls: {len(list_of_ghouls)}")
        # logger.info(list_of_ghouls[:2])
        # for i in range(len(list_of_ghouls)):
        last_return_ghoul_index = 0

        for i in range(1, len(list_of_ghouls) + 1):
            await self._parse_character_info(list_of_ghouls[i - 1])

            if i % self.batch_size == 0:
                time.sleep(3)
                logger.info(f"Returning batch: {i - self.batch_size} - {i}")
                yield list_of_ghouls[i - self.batch_size: i]
                last_return_ghoul_index = i

        # остаток, если длина не кратна batch_size
        if last_return_ghoul_index < len(list_of_ghouls):
            logger.info(f"Returning batch: {last_return_ghoul_index} - {len(list_of_ghouls)}")
            yield list_of_ghouls[last_return_ghoul_index:]

    async def parse_mansters(self):
        html = await Helper.get_page(self.domain_url + '/category/characters/mansters/')
        list_of_ghouls = await self._parse_characters_list(html, "manster")
        logger.info(f"Found manster: {len(list_of_ghouls)}")
        # logger.info(list_of_ghouls[:2])
        # for i in range(len(list_of_ghouls)):
        last_return_ghoul_index = 0

        for i in range(1, len(list_of_ghouls) + 1):
            await self._parse_character_info(list_of_ghouls[i - 1])

            if i % self.batch_size == 0:
                time.sleep(3)
                logger.info(f"Returning batch: {i - self.batch_size} - {i}")
                yield list_of_ghouls[i - self.batch_size: i]
                last_return_ghoul_index = i

        # остаток, если длина не кратна batch_size
        if last_return_ghoul_index < len(list_of_ghouls):
            logger.info(f"Returning batch: {last_return_ghoul_index} - {len(list_of_ghouls)}")
            yield list_of_ghouls[last_return_ghoul_index:]

    async def _parse_character_info(self, data: ParsedCharacterDTO):
        html = await Helper.get_page(data.link)
        logger.info(f"Parsing character: {data.name} from {data.link}")
        # await self._save_page_in_file(html)
        soup = BeautifulSoup(html, "html.parser")

        h1 = soup.find("h1")
        if h1:
            p = h1.find_next("p")
            data.description = p.get_text(strip=True) if p else None

    @staticmethod
    async def _parse_characters_list(html: str, gender: str) -> list[ParsedCharacterDTO]:
        soup = BeautifulSoup(html, "html.parser")
        results = []

        # Каждый персонаж находится в блоке <div class="cat_div_three">
        for div in soup.select("div.cat_div_three"):
            name_tag = div.find("h3").find("a")
            img_tag = div.find("img")
            count_tag = div.find("span", class_="key_note")

            name = name_tag.get_text(strip=True) if name_tag else None
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None

            # количество релизов, извлекаем число из скобок "(46)"
            count = None
            if count_tag:
                m = re.search(r"\((\d+)\)", count_tag.text)
                count = int(m.group(1)) if m else None

            image = img_tag["src"] if img_tag and img_tag.has_attr("src") else None

            if name and url:
                results.append(ParsedCharacterDTO(
                    name=Helper.format_name(name),
                    display_name=name,
                    gender=gender,
                    link=url,
                    count_of_releases=count,
                    primary_image=image,
                    original_html_content=html
                ))

        return results





