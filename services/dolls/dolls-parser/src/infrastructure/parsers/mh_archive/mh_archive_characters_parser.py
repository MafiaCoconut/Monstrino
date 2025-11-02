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
from monstrino_models.dto import ParsedCharacter
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_characters_port import ParseCharactersPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchiveCharactersParser(ParseCharactersPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.batch_size = 10
        self.source_name = "mh-archive"
        self.sleep_between_requests = 5
        self.debug_mode = False

    async def parse(self, ) -> None:
        pass

    async def parse_ghouls(self):
        async for batch in self._parse(self.domain_url + '/category/characters/ghouls/', gender="ghoul"):
            yield batch

    async def parse_mansters(self):
        async for batch in self._parse(self.domain_url + '/category/characters/mansters/', gender="manster"):
            yield batch

    async def _parse(self, url: str, gender: str):
        html = await Helper.get_page(url)
        list_of_ghouls = await self._parse_characters_list(html, gender)
        logger.info(f"Found dolls count: {len(list_of_ghouls)}")

        last_return_ghoul_index = 0

        for i in range(1, len(list_of_ghouls) + 1):
            await self._parse_character_info(list_of_ghouls[i - 1])

            if i % self.batch_size == 0:
                logger.info(f"Returning batch: {i - self.batch_size} - {i}")
                yield list_of_ghouls[i - self.batch_size: i]
                last_return_ghoul_index = i
                if self.debug_mode:
                    break
                await asyncio.sleep(self.sleep_between_requests)
                logger.debug(f"Sleeping {self.sleep_between_requests} seconds")


        if not self.debug_mode:
            if last_return_ghoul_index < len(list_of_ghouls):
                logger.info(f"Returning batch: {last_return_ghoul_index} - {len(list_of_ghouls)}")
                yield list_of_ghouls[last_return_ghoul_index:]

    @staticmethod
    async def _parse_character_info(data: ParsedCharacter):
        html = await Helper.get_page(data.link)
        logger.info(f"Parsing character: {data.name} from {data.link}")
        soup = BeautifulSoup(html, "html.parser")

        h1 = soup.find("h1")
        if h1:
            p = h1.find_next("p")
            data.description = p.get_text(strip=True) if p else None
        data.original_html_content = html

    async def _parse_characters_list(self, html: str, gender: str) -> list[ParsedCharacter]:
        soup = BeautifulSoup(html, "html.parser")
        results = []

        for div in soup.select("div.cat_div_three"):
            name_tag = div.find("h3").find("a")
            img_tag = div.find("img")
            count_tag = div.find("span", class_="key_note")

            name = name_tag.get_text(strip=True) if name_tag else None
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None

            image = img_tag["src"] if img_tag and img_tag.has_attr("src") else None

            if name and url:
                results.append(ParsedCharacter(
                    name=name,
                    gender=gender,
                    link=url,
                    primary_image=image,
                    source=self.source_name,
                ))

        return results





