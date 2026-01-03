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
from infra.parsers.helper import Helper
from infra.parsers.mh_archive.mh_archive_parser import MHArchiveParser

logger = logging.getLogger(__name__)


class MHArchivePetsParser(MHArchiveParser, ParsePetPort):
    def __init__(self):
        super().__init__(
            sleep_between_requests = 5
        )
        self.domain_url = os.getenv("MHARCHIVE_URL")
        self.base_url = self.domain_url+"/category/characters/pets/"

    async def iter_refs(self, scope: ParseScope, batch_size: int = 30):
        urls = await self._parse_urls()

        for i in range(0, len(urls), batch_size):
            end = min(i + batch_size, len(urls))

            logger.debug(f"Iterate release refs batch: {i}-{end}")
            batch = urls[i:end]
            yield [
                PetRef(
                    external_id=self._get_external_id(url),
                    url=url,
                )
                for url in batch
            ]

    async def parse_refs(
            self,
            refs: list[PetRef],
            batch_size: int = 10,
            limit: int = 9999999,
    ):
        urls = [r.url for r in refs]
        total = min(len(urls), limit)
        async for batch in self._iterate_parse(url_list=urls, total=total, batch_size=batch_size):
            yield batch

    async def parse(self, batch_size: int = 10, limit: int = 9999999):
        """
        FLOW:
        1. Process url to every pet on page
        2. Iterate every pet url and parse info
        3. Return batch
        """
        logger.info(f"============== Starting pets parser ==============")


        # Step 1
        list_of_pets = await self._parse_urls()
        logger.info(f"Found pets count: {len(list_of_pets)}")

        # Step 2-3
        total = min(len(list_of_pets), limit)
        async for batch in self._iterate_parse(url_list=list_of_pets, total=total, batch_size=batch_size):
            yield batch

    async def parse_by_external_id(self, external_id: str) -> Optional[ParsedPet]:
        return await self._parse_info(self.base_url+external_id+'/')

    async def _parse_urls(self) -> list[str]:
        html = await Helper.get_page(self.base_url)

        soup = BeautifulSoup(html, "html.parser")
        results = []

        for div in soup.select("div.cat_div_three"):
            name_tag = div.find("h3").find("a")
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None

            if url:
                results.append(url)

        return results

    async def _parse_info(self, url: str):
        logger.info(f"Parsing pet url: {url}")

        html = await Helper.get_page(url)

        soup = BeautifulSoup(html, "html.parser")

        # Get Name
        h1 = soup.find("h1")
        name = h1.get_text(" ", strip=True)
        name = re.sub(r"\s+", " ", name).strip()

        # Get Owner Name
        h2_tag = soup.find("h2")
        owner_name = None
        owner_name_url = h2_tag.find("a")
        if owner_name_url:
            owner_name_str = owner_name_url.get_text(strip=True)
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
            url=url,
            original_html_content=html,
            external_id=self._get_external_id(url),
        )

        return parsed_pet

    def _get_external_id(self, url: str) -> str:
        return url.replace(self.base_url, '').replace('/', '')
