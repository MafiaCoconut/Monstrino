import asyncio
import dataclasses
import os
import re
import time
import unicodedata
from typing import Optional, AsyncGenerator

import aiohttp
import logging

from icecream import ic
from monstrino_core.domain.errors import RequestIsBlockedError, GetPageError
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_models.dto import ParsedCharacter
from pydantic import BaseModel
from bs4 import BeautifulSoup

from app.ports.parse.parse_character_port import ParseCharacterPort
from domain.entities.parse_scope import ParseScope
from domain.entities.refs import CharacterRef
from infra.parsers.helper import Helper
from infra.parsers.mh_archive.mh_archive_parser import MHArchiveParser

logger = logging.getLogger(__name__)


class MHArchiveCharacterParser(MHArchiveParser, ParseCharacterPort):
    def __init__(self):
        super().__init__(
            sleep_between_requests = 5
        )
        self.domain_url = os.getenv("MHARCHIVE_URL")
        self.base_url = self.domain_url + '/category/characters'
        self.ghouls_url = self.base_url + '/ghouls/'
        self.mansters_url = self.base_url + '/mansters/'

    async def iter_refs(self, scope: ParseScope, batch_size: int = 30):
        urls_g = await self._parse_urls(self.ghouls_url)
        urls_m = await self._parse_urls(self.mansters_url)

        urls = urls_g + urls_m

        for i in range(0, len(urls), batch_size):
            end = min(i + batch_size, len(urls))

            logger.debug(f"Iterate character refs batch: {i}-{end}")
            batch = urls[i:end]
            yield [
                CharacterRef(
                    external_id=self._get_external_id(url),
                    url=url,
                )
                for url in batch
            ]

    async def parse_by_external_id(self, external_id: str, gender: CharacterGender) -> ParsedCharacter:
        if gender == CharacterGender.GHOUL:
            url = self.ghouls_url + external_id + '/'
        elif gender == CharacterGender.MANSTER:
            url = self.mansters_url + external_id + '/'
        else:
            raise ValueError(f"Unknown gender: {gender}")

        return await self._parse_info(url)

    async def parse_refs(
            self,
            refs: list[CharacterRef],
            batch_size: int = 10,
            limit: int = 9999999,
    ):
        urls = [r.url for r in refs]
        total = min(len(urls), limit)
        async for batch in self._iterate_parse(url_list=urls, total=total, batch_size=batch_size):
            yield batch

    async def parse(self, batch_size: int, limit: int) -> AsyncGenerator[list[ParsedCharacter]]:
        """
        Parse ghouls and then mansters from pages and yield batches of ParsedCharacter objects

        :return: [ParsedCharacter, ParsedCharacter, ...]
        """

        if limit <= 0:
            return

        batch_count = 0
        async for batch in self.parse_ghouls(batch_size=batch_size, limit=limit):
            batch_count += len(batch)
            yield batch

        if batch_count >= limit:
            return

        new_limit = limit - batch_count
        if new_limit <= 0:
            return

        async for batch in self.parse_mansters(batch_size=batch_size, limit=new_limit):
            yield batch

    async def parse_ghouls(self, batch_size: int, limit: int):
        """
        Parse mansters from manster page and yield batches of ParsedCharacter objects

        :return: [ParsedCharacter, ParsedCharacter, ...]
        """

        async for batch in self._parse(
            self.domain_url + '/category/characters/ghouls/',
            gender=CharacterGender.GHOUL,
            batch_size=batch_size, limit=limit
        ):
            yield batch

    async def parse_mansters(self, batch_size: int, limit: int) -> AsyncGenerator[list[ParsedCharacter]]:
        """
        Parse mansters from manster page and yield batches of ParsedCharacter objects

        :return: [ParsedCharacter, ParsedCharacter, ...]
        """
        async for batch in self._parse(
            self.domain_url + '/category/characters/mansters/',
            gender=CharacterGender.MANSTER,
            batch_size=batch_size, limit=limit
        ):
            yield batch

    async def _parse(self, url: str, gender: str, batch_size: int, limit: int) -> AsyncGenerator[list[ParsedCharacter]]:
        """
        FLOW:
        1. Process url to every ghoul/manster on page
        2. Iterate every ghoul/manster url and parse info
        3. Return batch
        """
        logger.info(f"============== Starting {gender}s parser ==============")

        # Step 1
        list_of_characters = await self._parse_urls(url)
        logger.info(f"Found dolls count: {len(list_of_characters)}")

        # Step 2
        total = min(len(list_of_characters), limit)
        async for batch in self._iterate_parse(url_list=list_of_characters, total=total, batch_size=batch_size):
            yield batch


    async def _parse_urls(self, url: str) -> list[str]:
        """
        Open page with all characters and then return list of urls to every available character
        """
        logger.info(f"Parsing characters urls from url: {url}")

        html = await self._get_page(url)
        soup = BeautifulSoup(html, "html.parser")

        results = []

        for div in soup.select("div.cat_div_three"):
            name_tag = div.find("h3").find("a")
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None
            if url:
                results.append(url)
        return results

    async def _parse_info(self, url: str) -> ParsedCharacter:
        logger.info(f"Parsing character from url: {url}")

        html = await self._get_page(url)

        soup = BeautifulSoup(html, "html.parser")

        title_tag = soup.find("h1")

        title = title_tag.get_text(strip=True) if title_tag else None
        if title == "Oops":
            raise ValueError(f"Character not found at url: {url}")

        p = title_tag.find_next("p")
        description = p.get_text(strip=True) if p else None

        if description.startswith("Releases:") or description.startswith("As an Amazon"):
            description = None

        if CharacterGender.GHOUL in url:
            gender = CharacterGender.GHOUL
        elif CharacterGender.MANSTER in url:
            gender = CharacterGender.MANSTER
        else:
            raise ValueError(f"Unknown gender: {url}")

        return ParsedCharacter(
            title=title,
            gender=gender,
            description=description,
            url=url,
            external_id=self._get_external_id(url),
            # original_html_content=html
        )

    def _get_external_id(self, url: str) -> str:
        url = url.replace(self.ghouls_url, '')
        url = url.replace(self.mansters_url, '')
        url = url.replace('/', '')
        return url


    async def _get_page(self, url: str) -> str:
        try:
            return await Helper.get_page(url)
        except RequestIsBlockedError as e:
            logger.error(e)
            raise
        except Exception as e:
            logger.error(e)
            raise




