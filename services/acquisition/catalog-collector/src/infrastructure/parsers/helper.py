import re
import unicodedata
import logging
import aiohttp
import os

logger = logging.getLogger(__name__)

headers = {
    "Host": "mhcollector.com",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:146.0) Gecko/20100101 Firefox/146.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Referer": os.getenv("MHARCHIVE_LINK"),
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-User": "?1",
    "Sec-Fetch-Dest": "document",
    "Priority": "u=0, i",
}

cookies = {
    "cf_clearance": os.getenv("MHARCHIVE_COOKIE"),
    "session": os.getenv("MHARCHIVE_SESSION"),
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
        logger.debug(f"Getting page: {url}")
        local_headers = headers.copy()
        local_headers["Referer"] = url
        async with aiohttp.ClientSession(headers=headers, cookies=cookies) as session:
            async with session.get(
                    url,
                    allow_redirects=False, ssl=False
            ) as resp:
                logger.info(f"Status: {resp.status}")
                return await resp.text()

    @staticmethod
    async def save_page_in_file(html: str):
        logger.debug(f"Starting saving file: page.html ({len(html)} symbols)")

        with open("src/data/page.html", "w", encoding="utf-8") as f:
            f.write(html)

        logger.debug(f"File saved: page.html ({len(html)} symbols)")
