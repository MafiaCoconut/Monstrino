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

from application.ports.parse.parse_pet_port import ParsePetPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchivePetsParser(ParsePetPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.source_name = "mh-archive"
        self.sleep_between_requests = 5
        self.debug_mode = False

    async def parse(self, batch_size: int = 10, limit: int = 9999999):
        """
        FLOW:
        1. Open page with list of all pets
        2. Process link to every pet on page
        3. Iterate every pet link and parse info
        4. Return batch
        """
        logger.info(f"============== Starting pets parser ==============")

        # Step 1
        html = await Helper.get_page(self.domain_url + '/category/characters/pets/')

        # Step 2
        list_of_pets = await self._parse_pets_list(html)
        logger.info(f"Found pets count: {len(list_of_pets)}")

        # Step 3
        for i in range(0, len(list_of_pets), batch_size):
            if i >= limit:
                break

            if i + batch_size > len(list_of_pets):
                batch_last_index = len(list_of_pets)
            elif i + batch_size > limit:
                batch_last_index = limit
            else:
                batch_last_index = i + batch_size

            logger.info(f"Processing batch: {i}-{batch_last_index}")
            batch = list_of_pets[i: batch_last_index]

            tasks = [self._parse_pet_info(p) for p in batch]
            batch_results = await asyncio.gather(*tasks, return_exceptions=True)
            yield batch

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
                results.append(
                    ParsedPet(
                        name="",
                        link=url,
                        primary_image=image,
                        source=self.source_name,
                        original_html_content="",
                    )
                )

        return results

    async def _parse_pet_info(self, parsed_pet: ParsedPet):
        html = await Helper.get_page(parsed_pet.link)
        soup = BeautifulSoup(html, "html.parser")

        # Get Name
        h1 = soup.find("h1")
        if h1:
            name = h1.get_text(" ", strip=True)
            name = re.sub(r"\s+", " ", name).strip()
            if name:
                parsed_pet.name = name

        # Get Owner Name
        h2_tag = soup.find("h2")
        if h2_tag:
            owner_name_link = h2_tag.find("a")
            if owner_name_link:
                owner_name_str = owner_name_link.get_text(strip=True)
                owner_name_str = re.sub(r"\s*\([^)]*\)", "", owner_name_str).strip()
                parsed_pet.owner_name = owner_name_str
            else:
                text = h2_tag.get_text(" ", strip=True)
                if "with" in text:
                    owner_name = text.split("with", 1)[-1].strip()
                    owner_name = re.sub(r"\s*\([^)]*\)", "", owner_name).strip()
                    parsed_pet.owner_name = owner_name

        # Get Description
        for p in soup.find_all("p"):
            if not p.find("strong") and len(p.get_text(strip=True)) > 20:
                parsed_pet.description = p.get_text(" ", strip=True)
                break

        # Save original HTML
        parsed_pet.original_html_content = html
