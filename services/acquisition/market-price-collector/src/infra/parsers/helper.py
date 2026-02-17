import re
import unicodedata
import logging
import aiohttp
import os

from monstrino_core.domain.errors import RequestIsBlockedError, GetPageError

logger = logging.getLogger(__name__)

headers = {
    # "Host": os.getenv("MHARCHIVE_URL").replace('https://', ''),
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:146.0) Gecko/20100101 Firefox/146.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Referer": os.getenv("MHARCHIVE_URL"),
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
    # "session": os.getenv("MHARCHIVE_SESSION"),
    "session": "e58ebc84-d248-4a69-b504-0bc2c0495ac1",
}
logger.info(os.getenv("MHARCHIVE_COOKIE"))

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
        local_headers = headers.copy()
        local_headers["Referer"] = url[:url.find('/', 24)]
        logger.info(f"Request")
        logger.info(f"Cookies: {cookies}")
        logger.info(f"Headers: {local_headers}")

        async with aiohttp.ClientSession(headers=local_headers, cookies=cookies) as session:
            async with session.get(
                    url,
                    allow_redirects=False, ssl=False
            ) as resp:
                logger.debug(f"Request on url={url} completed with status code={resp.status}")
                if resp.status == 200:
                    logger.info(resp.headers)
                    # logger.info(await resp.text())
                    return await resp.text()
                elif resp.status == 403:
                    logger.error(f"Request blocked with status 403: {url}")
                    logger.error(f"Headers: {resp.headers}")
                    logger.error(f"Body: {await resp.text()}")
                    raise RequestIsBlockedError(f"Request is blocked with status 403: {url}")
                else:
                    logger.error(f"Request blocked with status {resp.status}: {url}")
                    logger.error(f"Headers: {resp.headers}")
                    logger.error(f"Body: {await resp.text()}")
                    raise GetPageError(f"Get page error with status {resp.status}: {url}")


    @staticmethod
    async def save_page_in_file(html: str):
        logger.debug(f"Starting saving file: page.html ({len(html)} symbols)")

        with open("src/data/page.html", "w", encoding="utf-8") as f:
            f.write(html)

        logger.debug(f"File saved: page.html ({len(html)} symbols)")
