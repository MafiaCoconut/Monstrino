from typing import Protocol, Optional

from monstrino_contracts.v1.domains.catalog.catalog_api_service.responses import GetReleaseTypesResponse


class CatalogApiClientInterface(Protocol):
    async def get_release_types(self) -> Optional[GetReleaseTypesResponse]:
        ...