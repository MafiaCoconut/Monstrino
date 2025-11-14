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
from monstrino_models.dto import ParsedPet
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_pets_port import ParsePetsPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchivePetsParser(ParsePetsPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.batch_size = 10
        self.source_name = "mh-archive"
        self.sleep_between_requests = 5
        self.debug_mode = False


    async def parse(self):
        html = await Helper.get_page(self.domain_url + '/category/characters/pets/')
        list_of_pets = await self._parse_pets_list(html)
        logger.info(f"Found pets count: {len(list_of_pets)}")

        last_return_ghoul_index = 0

        for i in range(1, len(list_of_pets) + 1):
            await self._parse_pet_info(list_of_pets[i - 1])

            if i % self.batch_size == 0:
                logger.info(f"Returning batch: {i - self.batch_size} - {i}")
                yield list_of_pets[i - self.batch_size: i]
                last_return_ghoul_index = i
                await asyncio.sleep(self.sleep_between_requests)
                if self.debug_mode:
                    break

        if not self.debug_mode:
            if last_return_ghoul_index < len(list_of_pets):
                logger.info(f"Returning batch: {last_return_ghoul_index} - {len(list_of_pets)}")
                yield list_of_pets[last_return_ghoul_index:]

    async def _parse_pets_list(self, html: str) -> list[ParsedPet]:
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
                results.append(ParsedPet(
                    name=name,
                    display_name=name,
                    owner_name="",
                    link=url,
                    primary_image=image,
                    source=self.source_name
                ))

        return results

    async def _parse_pet_info(self, data: ParsedPet):
        html = await Helper.get_page(data.link)
        # await Helper.save_page_in_file(html)
        soup = BeautifulSoup(html, "html.parser")
        owner_name, owner_link = None, None
        h2_tag = soup.find("h2")
        if h2_tag:
            owner_name_link = h2_tag.find("a")
            if owner_name_link:
                owner_name_str = owner_name_link.get_text(strip=True)
                owner_name_str = re.sub(r"\s*\([^)]*\)", "", owner_name_str).strip()
                data.owner_name = owner_name_str
            else:
                text = h2_tag.get_text(" ", strip=True)
                if "with" in text:
                    owner_name = text.split("with", 1)[-1].strip()
                    owner_name = re.sub(r"\s*\([^)]*\)", "", owner_name).strip()
                    data.owner_name = owner_name

        description = None
        for p in soup.find_all("p"):
            if not p.find("strong") and len(p.get_text(strip=True)) > 20:
                data.description = p.get_text(" ", strip=True)
                break
        data.original_html_content = html
