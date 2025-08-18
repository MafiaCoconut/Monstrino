import logging

from typing import AsyncIterator

from application.ports.website_catalog_port import WebsiteCatalogPort
from domain.entities.doll import Doll
from infrastructure.config.selenium_config import get_selenium_driver

logger = logging.getLogger(__name__)


class MHArchiveAdapter(WebsiteCatalogPort):
    def __init__(self):
        pass

    async def get_year(self, year: int) -> AsyncIterator[Doll]:
        logger.info(f"Start parsing year - {year}")
        try:
            driver = get_selenium_driver()
            driver.close()
        except Exception as e:
            logger.error(f"Failed to parse - {e}")

    async def get_by_link(self, link: str) -> AsyncIterator[Doll]: ...