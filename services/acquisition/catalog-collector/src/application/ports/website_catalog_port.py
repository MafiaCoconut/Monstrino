from typing import Protocol, AsyncIterator

from domain.entities.doll import Doll


class WebsiteCatalogPort(Protocol):
    async def get_year(self, year: int) -> AsyncIterator[Doll]: ...
    async def get_by_link(self, link: str) -> AsyncIterator[Doll]: ...