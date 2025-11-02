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
from monstrino_models.dto import ParsedSeries
from pydantic import BaseModel
from bs4 import BeautifulSoup

from application.ports.parse.parse_series_port import ParseSeriesPort
from infrastructure.parsers.helper import Helper

logger = logging.getLogger(__name__)


class MHArchiveSeriesParser(ParseSeriesPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.batch_size = 1
        self.source_name = "mh-archive"


    async def parse(self):
        logger.info(f"============== Starting series parser ==============")
        html = await Helper.get_page(self.domain_url + '/category/series/')

        list_of_series = await self._parse_series_list(html)
        logger.info(f"Found series count: {len(list_of_series)}")

        for i, series in enumerate(list_of_series, start=1):
            parsed_series = await self._parse_series_info(series)
            await asyncio.sleep(2)
            logger.info(f"Returning series: {i}")

            yield parsed_series

        # остаток, если длина не кратна batch_size
        # if last_return_ghoul_index < len(list_of_series):
        #     logger.info(f"Returning batch: {last_return_ghoul_index} - {len(list_of_series)}")
        #     yield list_of_series[last_return_ghoul_index:]

    async def _parse_series_list(self, html: str) -> list[ParsedSeries]:
        logger.info("Parsing series links")
        soup = BeautifulSoup(html, "html.parser")
        results = []

        # Каждый блок серии — <div class="cat_div_three">
        for div in soup.select("div.cat_div_three"):
            h3_tag = div.find("h3")
            if not h3_tag:
                continue

            name_tag = h3_tag.find("a")
            count_tag = h3_tag.find("span", class_="key_note")
            img_tag = div.find("img")

            # Имя и ссылка
            name = name_tag.get_text(strip=True) if name_tag else None
            url = name_tag["href"] if name_tag and name_tag.has_attr("href") else None

            # Извлекаем количество релизов из вида "(10)"
            count = None
            if count_tag:
                m = re.search(r"\((\d+)\)", count_tag.text)
                count = int(m.group(1)) if m else None

            # Изображение
            image = img_tag["src"] if img_tag and img_tag.has_attr("src") else None

            # Добавляем только валидные результаты
            if name and url:
                results.append(ParsedSeries(
                    name=name,
                    link=url,
                    primary_image=image,
                    source=self.source_name
                ))

        return results

    async def _parse_series_info(self, data: ParsedSeries):
        logger.info('-----------------------------------------------------------------')
        logger.info(f"Parsing series info for series: {data.name}")

        list_of_dto = [data]

        html = await Helper.get_page(data.link)

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

        # ----------------- Series Type -------------------
        series_type: Optional[str] = None

        # 1. Fashion pack
        if "(F)" in text:
            series_type = "fashion_pack"

        # 2. Playsets
        elif any(x in (display_name or "").lower() for x in ["playset", "spots"]):
            series_type = "playsets"


        data.description = description
        data.series_type = series_type
        data.original_html_content = html

        subseries = await self.get_subseries(soup)
        logger.info(f"Found subseries: {subseries}")
        if subseries:
            data.series_type = "series_prime"
        elif data.series_type is None:
            data.series_type = "dolls"


        if subseries:
            data.series_type = "series_prime"
            logger.info(f"Found series {data.name} with subseries. Subseries count: {len(subseries)}")
            for sub_name in subseries:
                list_of_dto.append(
                    ParsedSeries(
                        name=sub_name,
                        description=None,
                        series_type="series_secondary",
                        primary_image=None,
                        link=data.link or "",
                        parent_name=data.name,
                        original_html_content=data.original_html_content,
                        source=self.source_name
                    )
                )
        return list_of_dto

    async def get_subseries(self, soup: BeautifulSoup) -> list:
        subseries = []
        for h2 in soup.find_all("h2"):
            title_raw = h2.get_text(strip=True)
            if not title_raw or title_raw.lower().startswith("monster high"):
                continue
            title = re.sub(r"\s*\([^)]*\)", "", title_raw).strip()

            subseries.append(title)

        return subseries