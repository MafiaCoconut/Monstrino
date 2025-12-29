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
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_models.dto import ParsedCharacter
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_character_port import ParseCharacterPort
from domain.entities.parse_scope import ParseScope
from domain.entities.refs import CharacterRef
from infrastructure.parsers.helper import Helper
from infrastructure.parsers.mh_archive.mh_archive_parser import MHArchiveParser

logger = logging.getLogger(__name__)


class MHArchiveCharacterParser(MHArchiveParser, ParseCharacterPort):
    def __init__(self):
        super().__init__(
            sleep_between_requests = 5
        )
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.base_url = self.domain_url + '/category/characters'
        self.ghouls_url = self.base_url + '/ghouls/'
        self.mansters_url = self.base_url + '/mansters/'

    async def iter_refs(self, scope: ParseScope, batch_size: int = 30):
        links_g = await self._parse_links(self.ghouls_url)
        links_m = await self._parse_links(self.mansters_url)

        links = links_g + links_m

        for i in range(0, len(links), batch_size):
            end = min(i + batch_size, len(links))

            logger.debug(f"Iterate character refs batch: {i}-{end}")
            batch = links[i:end]
            yield [
                CharacterRef(
                    external_id=self._get_external_id(link),
                    url=link,
                )
                for link in batch
            ]

    async def parse_link(self, link: str) -> ParsedCharacter:
        return await self._parse_info(link)

    async def parse_refs(
            self,
            refs: list[CharacterRef],
            batch_size: int = 10,
            limit: int = 9999999,
    ):
        links = [r.url for r in refs]
        total = min(len(links), limit)
        async for batch in self._iterate_parse(link_list=links, total=total, batch_size=batch_size):
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
        1. Process link to every ghoul/manster on page
        2. Iterate every ghoul/manster link and parse info
        3. Return batch
        """
        logger.info(f"============== Starting {gender}s parser ==============")

        # Step 1
        list_of_characters = await self._parse_links(url)
        logger.info(f"Found dolls count: {len(list_of_characters)}")

        # Step 2
        total = min(len(list_of_characters), limit)
        async for batch in self._iterate_parse(link_list=list_of_characters, total=total, batch_size=batch_size):
            yield batch


    async def _parse_links(self, link: str) -> list[str]:
        """
        Open page with all characters and then return list of links to every available character
        """
        logger.info(f"Parsing characters links from link: {link}")

        html = await Helper.get_page(link)
        soup = BeautifulSoup(html, "html.parser")

        results = []

        for div in soup.select("div.cat_div_three"):
            name_tag = div.find("h3").find("a")
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None
            if url:
                results.append(url)
        return results

    async def _parse_info(self, link: str) -> ParsedCharacter:
        logger.info(f"Parsing character from link: {link}")

        html = await Helper.get_page(link)
        soup = BeautifulSoup(html, "html.parser")

        title_tag = soup.find("h1")

        name = title_tag.get_text(strip=True) if title_tag else None

        p = title_tag.find_next("p")
        description = p.get_text(strip=True) if p else None

        if description.startswith("Releases:") or description.startswith("As an Amazon"):
            description = None

        if CharacterGender.GHOUL in link:
            gender = CharacterGender.GHOUL
        elif CharacterGender.MANSTER in link:
            gender = CharacterGender.MANSTER
        else:
            raise ValueError(f"Unknown gender: {link}")

        return ParsedCharacter(
            name=name,
            gender=gender,
            description=description,
            link=link,
            external_id=self._get_external_id(link),
            original_html_content=html
        )



    # async def _parse_characters_list(self, html: str, gender: str) -> list[ParsedCharacter]:
    #     soup = BeautifulSoup(html, "html.parser")
    #     results = []
    #
    #     for div in soup.select("div.cat_div_three"):
    #         name_tag = div.find("h3").find("a")
    #         img_tag = div.find("img")
    #         count_tag = div.find("span", class_="key_note")
    #
    #         name = name_tag.get_text(strip=True) if name_tag else None
    #         url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None
    #
    #         image = img_tag["src"] if img_tag and img_tag.has_attr("src") else None
    #
    #         if name and url:
    #             results.append(
    #                 ParsedCharacter(
    #                     name=name,
    #                     gender=gender,
    #                     link=url,
    #                     primary_image=image,
    #                     source=self.source_name,
    #                     original_html_content="",
    #                 )
    #             )
    #
    #     return results

    def _get_external_id(self, link: str) -> str:
        link = link.replace(self.ghouls_url, '')
        link = link.replace(self.mansters_url, '')
        link = link.replace('/', '')
        return link






