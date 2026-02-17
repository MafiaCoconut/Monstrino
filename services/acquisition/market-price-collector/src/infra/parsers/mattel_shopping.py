import os
import time
import unicodedata
from typing import Optional, AsyncGenerator
from lxml import etree
import aiohttp
import logging

from icecream import ic
from lxml.etree import _Element
from monstrino_core.domain.errors import RequestIsBlockedError, GetPageError
from monstrino_models.dto import ReleaseMarketLink
from pydantic import BaseModel
from bs4 import BeautifulSoup

from app.ports.parse.parse_market_port import ParseMarketPort
from .helper import Helper

logger = logging.getLogger(__name__)

class MattelShoppingParser(ParseMarketPort):
    def __init__(self):
        self.domain = "mattel.com"
        self.europa_prefix = "https://shopping"
        self.amerika_prefix = "https://shop"
        self.oceania_prefix = "https://shop"
        self.oceania_postfix = ".au"
        self.base_url = "https://shopping.mattel.com/"
        self.mh_part = "collections/monster-high"

        self.sitemaps = {
            "main": "https://shopping.mattel.com/sitemap.xml",
        }


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

        self.sitemap = "https://shopping.mattel.com/sitemap.xml"

        # self.base_url = "https://shopping.mattel.com/de-decountry}/en-{language}/toys/fashion-and-dolls/monster-high/c/SM06010429/{external_id}"
    # def _url_builder(self, country_code: str):
    #     country_code = country_code.lower()
    #     if country_code in self.europa_language_map.keys():
    #         language_code = self.europa_language_map[country_code]
    #         return f"{self.europa_prefix}.{self.domain}/{language_code}/{self.mh_part}"
    #
    #     elif country_code in self.america_language_map.keys():
    #         language_code = self.america_language_map[country_code]
    #         return f"{self.amerika_prefix}.{self.domain}/{language_code}/{self.mh_part}"
    #
    #     elif country_code in self.oceania_language_map.keys():
    #         language_code = self.oceania_language_map[country_code]
    #         return f"{self.oceania_prefix}.{self.domain}.{self.oceania_postfix}/{language_code}/{self.mh_part}"
    #
    #     else:
    #         raise ValueError(f"Unsupported country code: {country_code}")
    def _get_url(self, country_code: str):
        match country_code:
            case "fr":
                return "https://shopping.mattel.com/fr-fr/collections/monster-high"
            case "el":
                return "https://shopping.mattel.com/el-gr/collections/monster-high"
            case "it":
                return "https://shopping.mattel.com/it-it/collections/monster-high"
            case "es":
                return "https://shopping.mattel.com/es-es/collections/monster-high"
            case "de":
                return "https://shopping.mattel.com/de-de/collections/monster-high"
            case "en":
                return "https://shopping.mattel.com/en-gb/collections/monster-high"
            case "nl":
                return "https://shopping.mattel.com/nl-nl/collections/monster-high"
            case "pl":
                return "https://shopping.mattel.com/pl-pl/collections/monster-high"
            case "tr":
                return "https://shopping.mattel.com/tr-tr/collections/monster-high"
            case "us":
                return "https://shop.mattel.com/collections/monster-high"
            case "ca":
                return "https://shop.mattel.com/en-ca/collections/monster-high"
            case "mx":
                return "https://shop.mattel.com/es-mx/collections/monster-high"
            case "br":
                return "https://shop.mattel.com/pt-br/collections/monster-high"
            case "au":
                return "https://shop.mattel.com.au/collections/monster-high"


    def _get_root(self, xml_bytes: bytes) -> _Element:
        root = etree.fromstring(xml_bytes)
        return root

    def _get_sitemaps_from_sitemap(self, root: _Element) -> list[str]:
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        return [sitemap for sitemap in root.xpath("//sm:sitemap/sm:loc/text()", namespaces=ns)]

    def _get_products_sitemaps_from_main_sitemap(self, sitemaps: list[str]) -> list[str]:
        result_list = []
        for sitemap in sitemaps:
            if "products" in sitemap:
                result_list.append(sitemap)

        return result_list

    def _get_product_urls_from_sitemap_products_n(self, root: _Element) -> list[str]:
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        product_links = root.xpath(
            "//sm:url/sm:loc[starts-with(text(), 'https://shopping.mattel.com/products')]/text()",
            namespaces=ns
        )

        result_list = []
        for product in product_links:
            if "monster-high" in product:
                result_list.append(product)

        return result_list

    async def parse_all_release_links(self):
        page_xml = await Helper.get_bytes_from_page(self.sitemap)
        root = self._get_root(page_xml)
        sitemaps = self._get_sitemaps_from_sitemap(root)
        product_sitemaps = self._get_products_sitemaps_from_main_sitemap(sitemaps)

        for sitemap in product_sitemaps:
            page_xml = await Helper.get_bytes_from_page(sitemap)
            root = self._get_root(page_xml)
            product_urls = self._get_product_urls_from_sitemap_products_n(root)

            iter_count = 0
            for product_url in product_urls[:12]:
                release_market_link = ReleaseMarketLink(

                )
                ic(product_url)


                iter_count += 1
                page_json = await Helper.get_json(f'{product_url}.json' )
                try:
                    variant = page_json.get('product', {}).get('variants', [])[0]
                    price = variant.get('price')
                    currency = variant.get('price_currency')
                    ic(price)
                    ic(currency)

                except Exception as e:
                    logger.error(f"Error parsing product url: {product_url}, error: {e}")

                if iter_count % 5 == 0:
                    time.sleep(3)


            break











    async def parse_by_external_id(self, country_code: str, external_id: str):
        url = self._get_url(country_code)
        await self._parse_release(url)

    async def parse_page(self, url: str):
        await self._parse_release(url)

    async def _parse_release(self, url: str):
        logger.info(f"Parsing release from url: {url}")
        page_json = await Helper.get_json(url)
        ic(page_json)
        variants = page_json.get('product', {}).get('variants', [])
        original_variant = variants[0]

        currency = original_variant.get('price_currency')
        price = original_variant.get('price')
        ic(price)
        ic(currency)

        # html = await Helper.get_page(url)
        # Helper.save_page_in_file(html)

