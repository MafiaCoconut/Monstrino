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
from domain.entities.parse_scope import ParseScope
from domain.entities.refs import PetRef
from infrastructure.parsers.helper import Helper
from infrastructure.parsers.mh_archive.mh_archive_parser import MHArchiveParser

logger = logging.getLogger(__name__)


class MHArchivePetsParser(MHArchiveParser, ParsePetPort):
    def __init__(self):
        super().__init__(
            sleep_between_requests = 5
        )
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.base_url = self.domain_url+"/category/characters/pets/"

    async def iter_refs(self, scope: ParseScope, batch_size: int = 30):
        links = await self._parse_links()

        for i in range(0, len(links), batch_size):
            end = min(i + batch_size, len(links))

            logger.debug(f"Iterate release refs batch: {i}-{end}")
            batch = links[i:end]
            yield [
                PetRef(
                    external_id=self._get_external_id(link),
                    url=link,
                )
                for link in batch
            ]

    async def parse_refs(
            self,
            refs: list[PetRef],
            batch_size: int = 10,
            limit: int = 9999999,
    ):
        links = [r.url for r in refs]
        total = min(len(links), limit)
        async for batch in self._iterate_parse(link_list=links, total=total, batch_size=batch_size):
            yield batch

    async def parse(self, batch_size: int = 10, limit: int = 9999999):
        """
        FLOW:
        1. Process link to every pet on page
        2. Iterate every pet link and parse info
        3. Return batch
        """
        logger.info(f"============== Starting pets parser ==============")


        # Step 1
        list_of_pets = await self._parse_links()
        logger.info(f"Found pets count: {len(list_of_pets)}")

        # Step 2-3
        total = min(len(list_of_pets), limit)
        async for batch in self._iterate_parse(link_list=list_of_pets, total=total, batch_size=batch_size):
            yield batch

    async def parse_link(self, link: str) -> Optional[ParsedPet]:
        return await self._parse_info(link)

    async def _parse_links(self) -> list[str]:
        html = await Helper.get_page(self.base_url)

        soup = BeautifulSoup(html, "html.parser")
        results = []

        for div in soup.select("div.cat_div_three"):
            name_tag = div.find("h3").find("a")
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None

            if url:
                results.append(url)

        return results

    async def _parse_info(self, link: str):
        logger.info(f"Parsing pet link: {link}")

        html = await Helper.get_page(link)

        soup = BeautifulSoup(html, "html.parser")

        # Get Name
        h1 = soup.find("h1")
        name = h1.get_text(" ", strip=True)
        name = re.sub(r"\s+", " ", name).strip()

        # Get Owner Name
        h2_tag = soup.find("h2")
        owner_name = None
        owner_name_link = h2_tag.find("a")
        if owner_name_link:
            owner_name_str = owner_name_link.get_text(strip=True)
            owner_name = re.sub(r"\s*\([^)]*\)", "", owner_name_str).strip()
        else:
            text = h2_tag.get_text(" ", strip=True)
            if "with" in text:
                    owner_name = text.split("with", 1)[-1].strip()
                    owner_name = re.sub(r"\s*\([^)]*\)", "", owner_name).strip()

        # Get Description
        title_tag = soup.find("h1")

        p = title_tag.find_next("p")
        description = p.get_text(strip=True) if p else None

        if description.startswith("Releases:") or description.startswith("As an Amazon"):
            description = None


        # Save original HTML
        parsed_pet = ParsedPet(
            name=name,
            description=description,
            owner_name=owner_name,
            link=link,
            original_html_content=html,
            external_id=self._get_external_id(link),
        )

        return parsed_pet

    def _get_external_id(self, link: str) -> str:
        return link.replace(self.base_url, '').replace('/', '')
