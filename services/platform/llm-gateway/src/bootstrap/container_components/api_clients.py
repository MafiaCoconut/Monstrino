from dataclasses import dataclass

from app.interfaces import CatalogApiClientInterface


@dataclass(frozen=True)
class ApiClients:
    catalog_api_client: CatalogApiClientInterface
    