from application.ports.logger_port import LoggerPort
from application.ports.website_catalog_port import WebsiteCatalogPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey


class ParseWebsiteUseCase:
    def __init__(self, registry: PortsRegistry, logger: LoggerPort):
        self._r = registry
        self._l = logger

    async def by_year(self, site: WebsiteKey, year: int):
        port = self._r.get(site, WebsiteCatalogPort)
        product = await port.get_year(year)
        return None