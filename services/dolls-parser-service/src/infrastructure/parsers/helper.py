import re
import unicodedata
import logging
import aiohttp
import os

logger = logging.getLogger(__name__)

headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:144.0) Gecko/20100101 Firefox/144.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    # "Accept-Encoding": "gzip, deflate, br, zstd",
    "Referer": f"{os.getenv("MHARCHIVE_LINK")}",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}

cookies = {
    "cf_clearance": os.getenv("MHARCHIVE_COOKIE"),
}

class Helper:
    @staticmethod
    def format_name(name: str) -> str:
        value = name.lower()
        value = unicodedata.normalize('NFKD', value)
        value = value.encode('ascii', 'ignore').decode('ascii')
        value = re.sub(r'[^a-z0-9]+', '-', value)
        value = value.strip('-')
        value = re.sub(r'-{2,}', '-', value)

        return value

    @staticmethod
    async def get_page(url: str):
        logger.info(f"Getting page: {url}")

        async with aiohttp.ClientSession(headers=headers, cookies=cookies) as session:
            async with session.get(
                    url,
                    allow_redirects=False, ssl=False
            ) as resp:
                logger.info(f"Status: {resp.status}")
                return await resp.text()

    @staticmethod
    async def save_page_in_file(html: str):
        logger.info(f"Starting saving file: page.html ({len(html)} symbols)")

        with open("data/page.html", "w", encoding="utf-8") as f:
            f.write(html)

        logger.info(f"File saved: page.html ({len(html)} symbols)")
