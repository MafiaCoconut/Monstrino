import os
import time
import unicodedata
from typing import Optional, AsyncGenerator

import aiohttp
import logging

from icecream import ic
from monstrino_core.domain.errors import RequestIsBlockedError, GetPageError
from pydantic import BaseModel
from bs4 import BeautifulSoup

from .helper import Helper

logger = logging.getLogger(__name__)

class SmythParser:
    def __init__(self):
        self.base_url = "https://www.smythstoys.com/{country}/en-{language}/toys/fashion-and-dolls/monster-high/c/SM06010429/{external_id}"

    async def parse_by_external_id(self, country_code: str, language: str, external_id: str):
        url = self.base_url.format(country=country_code,language=language, external_id=external_id)
        await self._parse_release(url)

    async def _parse_release(self, url: str):
        logger.info(f"Parsing release from url: {url}")
        html = await Helper.get_page(url)
        Helper.save_page_in_file(html)

