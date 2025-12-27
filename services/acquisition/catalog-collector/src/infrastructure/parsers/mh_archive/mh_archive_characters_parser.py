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
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_models.dto import ParsedCharacter
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_character_port import ParseCharacterPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchiveCharacterParser(ParseCharacterPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.source_name = "mh-archive"
        self.sleep_between_requests = 5
        self.debug_mode = False

    async def parse(self, ) -> None:
        pass

    async def parse_ghouls(self, batch_size: int, limit: int):
        async for batch in self._parse(
                self.domain_url + '/category/characters/ghouls/',
                gender=CharacterGender.GHOUL,
                batch_size=batch_size, limit=limit
        ):
            yield batch

    async def parse_mansters(self, batch_size: int, limit: int):
        async for batch in self._parse(
                self.domain_url + '/category/characters/mansters/',
                gender=CharacterGender.MANSTER,
                batch_size=batch_size, limit=limit
        ):
            yield batch

    async def _parse(self, url: str, gender: str, batch_size: int, limit: int):
        """
        FLOW:
        1. Open page with list of all ghouls/mansters
        2. Process link to every ghoul/manster on page
        3. Iterate every ghoul/manster link and parse info
        4. Return batch
        """
        logger.info(f"============== Starting {gender}s parser ==============")

        # Step 1
        html = await Helper.get_page(url)

        # Step 2
        list_of_characters = await self._parse_characters_list(html, gender)
        logger.info(f"Found dolls count: {len(list_of_characters)}")

        # Step 3
        for i in range(0, len(list_of_characters), batch_size):
            if i >= limit:
                break

            if i + batch_size > len(list_of_characters):
                batch_last_index = len(list_of_characters)
            elif i + batch_size > limit:
                batch_last_index = limit
            else:
                batch_last_index = i + batch_size

            logger.info(f"Processing batch: {i}-{batch_last_index}")
            batch = list_of_characters[i: batch_last_index]

            tasks = [self._parse_character_info(p) for p in batch]
            batch_results = await asyncio.gather(*tasks, return_exceptions=True)
            yield batch

            logger.info(f"Waiting sleep time: {self.sleep_between_requests} seconds")
            await asyncio.sleep(self.sleep_between_requests)

    @staticmethod
    async def _parse_character_info(data: ParsedCharacter):
        logger.info('-----------------------------------------------------------------')
        logger.info(f"Parsing character: {data.name} from {data.link}")

        html = await Helper.get_page(data.link)
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
                results.append(
                    ParsedCharacter(
                        name=name,
                        gender=gender,
                        link=url,
                        primary_image=image,
                        source=self.source_name,
                        original_html_content="",
                    )
                )

        return results





