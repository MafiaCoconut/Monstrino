from application.ports.website_catalog_port import WebsiteCatalogPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.source_key import SourceKey


class GetDollsUseCase:
    def __init__(self, registry: PortsRegistry):
        self._r = registry

    async def by_year(self, site: SourceKey, year: int):
        port = self._r.get(site, WebsiteCatalogPort)
        product = port.get_year(year)
        return None