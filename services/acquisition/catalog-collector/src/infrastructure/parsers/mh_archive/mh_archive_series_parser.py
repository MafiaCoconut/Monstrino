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
from monstrino_core.domain.value_objects import SeriesTypes
from monstrino_models.dto import ParsedSeries
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_series_port import ParseSeriesPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchiveSeriesParser(ParseSeriesPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.source_name = "mh-archive"


    async def parse(self, batch_size: int = 10, limit: int = 9999999):
        """
        FLOW:
        1. Open page with list of all pets
        2. Process link to every pet on page
        3. Iterate every pet link and parse info
        4. Return batch

        Returning [[ParsedSeries()], [ParsedSeries(PRIMARY), PARSEDSeries(SECONDARY)...], [...]]
        """
        logger.info(f"============== Starting series parser ==============")

        # Step 1
        html = await Helper.get_page(self.domain_url + '/category/series/')

        # Step 2
        list_of_series = await self._parse_series_list(html)
        logger.info(f"Found series count: {len(list_of_series)}")

        # Step 3
        for i in range(0, len(list_of_series), batch_size):
            if i >= limit:
                break

            if i + batch_size > len(list_of_series):
                batch_last_index = len(list_of_series)
            elif i + batch_size > limit:
                batch_last_index = limit
            else:
                batch_last_index = i + batch_size

            logger.info(f"Processing batch: {i}-{batch_last_index}")
            batch = list_of_series[i: batch_last_index]

            tasks = [self._parse_series_info(p) for p in batch]
            # tasks = [self.test(p) for p in batch]
            batch_results = await asyncio.gather(*tasks, return_exceptions=True)
            ic(batch_results)
            yield batch_results

            logger.info(f"Waiting sleep time: {self.sleep_between_requests} seconds")
            await asyncio.sleep(self.sleep_between_requests)

    async def test(self, data):
        print(data)

    async def _parse_series_list(self, html: str) -> list[ParsedSeries]:
        logger.info("Parsing series links")
        soup = BeautifulSoup(html, "html.parser")
        results = []

        for div in soup.select("div.cat_div_three"):
            h3_tag = div.find("h3")
            if not h3_tag:
                continue

            name_tag = h3_tag.find("a")
            count_tag = h3_tag.find("span", class_="key_note")
            img_tag = div.find("img")

            name = name_tag.get_text(strip=True) if name_tag else None
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None

            count = None
            if count_tag:
                m = re.search(r"\((\d+)\)", count_tag.text)
                count = int(m.group(1)) if m else None

            # Image
            image = img_tag["src"] if img_tag and img_tag.has_attr("src") else None

            if name and url:
                results.append(ParsedSeries(
                    name=name,
                    link=url,
                    primary_image=image,
                    source=self.source_name,
                    series_type=SeriesTypes.PRIMARY,
                    original_html_content=""
                ))

        return results

    async def _parse_series_info(self, series: ParsedSeries) -> list[ParsedSeries]:
        logger.info('-----------------------------------------------------------------')
        logger.info(f"Parsing series info for series: {series.name}")

        list_of_dto = [series]

        html = await Helper.get_page(series.link)

        soup = BeautifulSoup(html, "html.parser")
        title_tag = soup.find("h1")

        # ----------------- Display Name -------------------
        display_name = title_tag.get_text(strip=True) if title_tag else None

        # ----------------- Description -------------------
        meta_desc = soup.find("meta", {"property": "og:description"})
        description = meta_desc["content"].strip() if meta_desc and meta_desc.has_attr("content") else None
        if not description:
            p_tag = title_tag.find_next("p") if title_tag else None
            description = p_tag.get_text(strip=True) if p_tag else None

        text = soup.get_text(" ", strip=True)

        series.description = description
        # series.original_html_content = html

        subseries = await self.get_subseries(soup)

        if subseries:
            logger.info(f"Found series {series.name} with subseries. Subseries count: {len(subseries)}")
            for sub_name in subseries:
                list_of_dto.append(
                    ParsedSeries(
                        name=sub_name,
                        description=None,
                        series_type=SeriesTypes.SECONDARY,
                        primary_image=None,
                        link=series.link or "",
                        parent_name=series.name,
                        original_html_content=series.original_html_content,
                        source=self.source_name
                    )
                )
        return list_of_dto

    async def get_subseries(self, soup: BeautifulSoup) -> list[str]:
        subseries = []
        for h2 in soup.find_all("h2"):
            title_raw = h2.get_text(strip=True)
            if not title_raw or title_raw.lower().startswith("monster high"):
                continue
            title = re.sub(r"\s*\([^)]*\)", "", title_raw).strip()

            subseries.append(title)

        return subseries


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
