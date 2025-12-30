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
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.value_objects import SeriesTypes
from monstrino_models.dto import ParsedSeries
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_series_port import ParseSeriesPort
from domain.entities.parse_scope import ParseScope
from domain.entities.refs import SeriesRef
from infrastructure.parsers.helper import Helper
from infrastructure.parsers.mh_archive.mh_archive_parser import MHArchiveParser

logger = logging.getLogger(__name__)


class MHArchiveSeriesParser(MHArchiveParser, ParseSeriesPort):
    def __init__(self):
        super().__init__(
            sleep_between_requests = 5
        )
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.base_url = self.domain_url+"/category/series/"

    async def iter_refs(self, scope: ParseScope, batch_size: int = 30):
        links = await self._parse_links()

        for i in range(0, len(links), batch_size):
            end = min(i + batch_size, len(links))

            logger.debug(f"Iterate release refs batch: {i}-{end}")
            batch = links[i:end]
            yield [
                SeriesRef(
                    external_id=self._get_external_id(link),
                    url=link,
                )
                for link in batch
            ]

    async def parse_refs(
            self,
            refs: list[SeriesRef],
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

        Returning [[ParsedSeries()], [ParsedSeries(PRIMARY), PARSEDSeries(SECONDARY)...], [...]]
        """
        logger.info(f"============== Starting series parser ==============")

        # Step 1
        list_of_series = await self._parse_links()
        logger.info(f"Found series count: {len(list_of_series)}")

        # Step 2-3
        total = min(len(list_of_series), limit)
        async for batch in self._iterate_parse(link_list=list_of_series, total=total, batch_size=batch_size):
            yield batch

    async def parse_link(self, link: str) -> list[ParsedSeries]:
        return await self._parse_info(link)

    async def _parse_links(self) -> list[str]:
        html = await Helper.get_page(self.base_url)

        soup = BeautifulSoup(html, "html.parser")
        links = []
        for div in soup.select("div.cat_div_three"):
            h3_tag = div.find("h3")
            if not h3_tag:
                continue

            name_tag = h3_tag.find("a")

            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None
            links.append(url)

        return links

    async def _parse_info(self, link: str) -> list[ParsedSeries]:
        logger.info(f"Parsing series info for series link: {link}")

        html = await Helper.get_page(link)

        soup = BeautifulSoup(html, "html.parser")
        title_tag = soup.find("h1")

        # ----------------- Display Name -------------------
        name = title_tag.get_text(strip=True) if title_tag else None
        # ----------------- Description -------------------
        meta_desc = soup.find("meta", {"property": "og:description"})
        description = meta_desc["content"].strip() if meta_desc and meta_desc.has_attr("content") else None
        if not description:
            p_tag = title_tag.find_next("p") if title_tag else None
            description = p_tag.get_text(strip=True) if p_tag else None

        series = ParsedSeries(
            name=name,
            description=description,
            series_type=SeriesTypes.PRIMARY,
            link=link,
            external_id=self._get_external_id(link),
            original_html_content=html,
        )
        list_of_dto = [series]

        subseries = await self._get_subseries(soup)
        if subseries:
            logger.info(f"Found series {series.name} with subseries. Subseries count: {len(subseries)}")
            for sub_name in subseries:
                list_of_dto.append(
                    ParsedSeries(
                        name=sub_name,
                        description=None,
                        series_type=SeriesTypes.SECONDARY,
                        parent_name=series.name,
                        link=series.link,
                        external_id=NameFormatter.format_name(sub_name),
                        original_html_content=series.original_html_content,
                    )
                )
        return list_of_dto

    async def _get_subseries(self, soup: BeautifulSoup) -> list[str]:
        subseries = []
        for h2 in soup.find_all("h2"):
            title_raw = h2.get_text(strip=True)
            if not title_raw or title_raw.lower().startswith("monster high"):
                continue
            title = re.sub(r"\s*\([^)]*\)", "", title_raw).strip()

            subseries.append(title)

        return subseries

    def _get_external_id(self, link: str) -> str:
        return link.replace(self.base_url,'').replace('/', '')


# =================== ARCHIVED ===================
# series_type: Optional[str] = None
#
# # 1. Fashion pack
# if "(F)" in text:
#     series_type = "fashion_pack"
#
# # 2. Playsets
# elif any(x in (display_name or "").lower() for x in ["playset", "spots"]):
#     series_type = "playsets"
# data.series_type = series_type
