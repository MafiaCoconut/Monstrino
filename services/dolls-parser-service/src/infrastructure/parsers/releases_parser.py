import os
import aiohttp
import logging

from bs4 import BeautifulSoup

from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.ports.parse.parse_releases_port import ParseReleasesPort

logger = logging.getLogger(__name__)


class ReleasesParser(ParseReleasesPort):
    def __init__(self):
        self.domain_url = os.getenv("MHARCHIVE_LINK")
        self.headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:144.0) Gecko/20100101 Firefox/144.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            # "Accept-Encoding": "gzip, deflate, br, zstd",
            "Referer": f"{os.getenv("MHARCHIVE_LINK")}",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        }
        self.cookies = {
            "cf_clearance": os.getenv("MHARCHIVE_COOKIE"),
        }

    async def parse(self, ) -> None:
        logger.info('!!!!!!!!!!!!!!')

        async with aiohttp.ClientSession(headers=self.headers, cookies=self.cookies) as session:
            async with session.get(
                    self.domain_url + '/boo-york-boo-york-gala-ghoulfriends-elle-eedee/',
                    allow_redirects=False, ssl=False
            ) as resp:
                logger.info(f"Status: {resp.status}")

                html = await resp.text()

                # 💾 сохраняем HTML-файл
                with open("data/page.html", "w", encoding="utf-8") as f:
                    f.write(html)

                print(f"Файл сохранён: page.html ({len(html)} символов)")

    async def parse_data_from_html(self, html: str):
        soup = BeautifulSoup(html, "html.parser")

        # Заголовок (название набора)
        title = soup.find("h1").get_text(strip=True)

        # Основное изображение
        image_tag = soup.select_one(".content_image img")
        image_url = image_tag["src"] if image_tag else None

        # Описание — первые абзацы до блока "From the box"
        paragraphs = []
        for p in soup.select(".column_1 > p"):
            paragraphs.append(p.get_text(" ", strip=True))
        description = "\n".join(paragraphs)

        # Блок "From the box"
        box_section = soup.select_one(".from_the_box")
        box_text = box_section.get_text("\n", strip=True) if box_section else None

        # Характеристики (список под .stats)
        stats = {}
        for ul in soup.select(".stats ul"):
            key_el, val_el = ul.find_all("li")
            key = key_el.get_text(strip=True).rstrip(":")
            val = val_el.get_text(strip=True)
            stats[key] = val

        # Open Graph метаданные (доп. источник)
        meta = {m["property"]: m["content"]
                for m in soup.select("meta[property]") if m.has_attr("content")}
        og_description = meta.get("og:description")

        # Формируем итоговый словарь
        data = {
            "title": title,
            "character": stats.get("Character"),
            "series": stats.get("Series"),
            "year": stats.get("Released"),
            "gender": stats.get("Gender"),
            "model_number": stats.get("Model Number"),
            "description": description or og_description,
            "from_the_box": box_text,
            "image": image_url,
            "page_url": meta.get("og:url")
        }

        return data