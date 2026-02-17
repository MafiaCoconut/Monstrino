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

class MattelShoppingParser:
    def __init__(self):
        self.domain = "mattel.com"
        self.europa_prefix = "https://shopping"
        self.amerika_prefix = "https://shop"
        self.oceania_prefix = "https://shop"
        self.oceania_postfix = ".au"
        self.base_url = "https://shopping.mattel.com/"
        self.mh_part = "collections/monster-high"


        self.europa_language_map = {
            "fr": "fr-fr",  # France (Français)
            "el": "el-gr",  # Greece (Ελληνική)
            "it": "it-it",  # Italy (Italiano)
            "es": "es-es",  # Spain (Español)
            "de": "de-de",  # Germany (Deutsch)
            "en": "en-gb",  # English (United Kingdom)
            "nl": "nl-nl",  # Nederlands (Dutch)
            "pl": "pl-pl",  # Poland (Polski)
            "tr": "tr-tr",  # Turkey (Türkçe)
        }
        self.america_language_map = {
            "us": "",           # United States (English)
            "ca": "en-ca",      # Canada (English)
            # "ca": "fr-ca",      # Canada (Français)
            "mx": "es-mx",      # México (Español)
            "br": "pt-br",      # Brasil (Português)
        }
        self.oceania_language_map = {
            "au": ""            # Australia (English)
        }

        # self.base_url = "https://shopping.mattel.com/de-decountry}/en-{language}/toys/fashion-and-dolls/monster-high/c/SM06010429/{external_id}"
    def _url_builder(self, country_code: str):
        country_code = country_code.lower()
        if country_code in self.europa_language_map.keys():
            language_code = self.europa_language_map[country_code]
            return f"{self.europa_prefix}.{self.domain}/{language_code}/{self.mh_part}"

        elif country_code in self.america_language_map.keys():
            language_code = self.america_language_map[country_code]
            return f"{self.amerika_prefix}.{self.domain}/{language_code}/{self.mh_part}"

        elif country_code in self.oceania_language_map.keys():
            language_code = self.oceania_language_map[country_code]
            return f"{self.oceania_prefix}.{self.domain}.{self.oceania_postfix}/{language_code}/{self.mh_part}"

        else:
            raise ValueError(f"Unsupported country code: {country_code}")

    async def parse_by_external_id(self, country_code: str, external_id: str):
        url = self._url_builder(country_code)
        await self._parse_release(url)

    async def parse_page(self, url: str):
        await self._parse_release(url)
        
    async def _parse_release(self, url: str):
        logger.info(f"Parsing release from url: {url}")
        html = await Helper.get_page(url)
        Helper.save_page_in_file(html)

