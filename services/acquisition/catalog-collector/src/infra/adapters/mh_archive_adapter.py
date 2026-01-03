import asyncio
import os
from typing import AsyncIterator, Mapping
import time
from yarl import URL
import aiohttp
import requests
from bs4 import BeautifulSoup
from icecream import ic
from application.ports.logger_port import LoggerPort
from application.ports.website_catalog_port import WebsiteCatalogPort
from domain.entities.doll import Doll
from urllib.parse import urljoin


class MHArchiveAdapter(WebsiteCatalogPort):
    def __init__(self, logger: LoggerPort):
        self.logger = logger
        self.link = os.getenv("MHARCHIVE_URL")
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Accept-Language': 'de-DE,de;q=0.9',
        }
        self.cookies = {
            "session", "cf_clearance"
        }

    def filter_cookies(self, raw: Mapping[str, str]) -> dict[str, str]:
        return {k: v for k, v in raw.items() if k in self.cookies}

    async def make_session_with_cookies(self, base: str, start_cookies: Mapping[str, str]) -> aiohttp.ClientSession:
        jar = aiohttp.CookieJar()  # обычная, безопасная cookie-политика
        session = aiohttp.ClientSession(
            cookie_jar=jar,
            headers={
                "User-Agent": "ResearchBot/1.0 (+contact: you@example.com)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            },
            raise_for_status=False,
            timeout=aiohttp.ClientTimeout(total=30),
        )
        # Инициализируем куки «как будто» сервер выдал их для этого домена.
        jar.update_cookies(self.filter_cookies(start_cookies), response_url=URL(base))
        return session

    async def get_year(self, year: int) -> AsyncIterator[Doll]:
        self.logger.info(f"Start parsing year - {year}")
        try:
            pass
        except Exception as e:
            self.logger.error(f"Failed to parse - {e}")


    async def get_by_link(self, link: str = "skullector-corpse-bride/") -> AsyncIterator[Doll]:
        url = self.link + link
        self.logger.info(f"Start parsing link - '{url}'")

        from playwright.async_api import async_playwright
        try:
            async with async_playwright() as p:
                # Подключаемся к УЖЕ запущенному Chrome
                browser = await p.chromium.connect_over_cdp("http://localhost:9222")

                # Берём первый контекст (ваш профиль) и первую страницу
                context = browser.contexts[0]
                page = context.pages[0] if context.pages else await context.new_page()

                # Можно работать с уже открытыми вкладками:
                for pg in context.pages:
                    print("TAB:", pg.url)

                # Переход на сайт и чтение данных
                await page.goto(url, wait_until="domcontentloaded")
                print(await page.title())
                html = await page.content()

                soup = BeautifulSoup(html, "lxml")
                el = soup.select_one(".stats.bgc2.zero_mar_twenty")
                print(f"el: {el}")
                print(el.get_text(" ", strip=True))

                out = {}
                # Берём только прямых детей <ul> этого блока
                for ul in el.select(":scope > ul"):
                    lis = ul.find_all("li", recursive=False)
                    if len(lis) < 2:
                        continue

                    label = lis[0].get_text(strip=True).rstrip(":")
                    value_li = lis[1]

                    # Все ссылки в значении (если есть)
                    links = []
                    for a in value_li.find_all("a", href=True):
                        href = a["href"]
                        if url:
                            href = urljoin(url, href)
                        links.append({
                            "text": a.get_text(strip=True),
                            "url": href
                        })

                    text_value = value_li.get_text(" ", strip=True) or None
                    out[label] = {"text": text_value, "links": links or None}

                ic(out)
                # Пример извлечения данных из DOM (JS-выражением)
                # price = page.eval_on_selector(".price", "el => el.textContent?.trim()")
                # print("price:", price)

                await browser.close()  # соединение CDP закрываем (сам Chrome останется запущенным)
        except Exception as e:
            self.logger.error(f"Failed to parse - {e}")
        finally:
            pass
            # driver.close()



