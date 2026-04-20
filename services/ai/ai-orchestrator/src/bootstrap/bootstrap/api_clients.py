from bootstrap.container_components import ApiClients
from infra.api_clients import CatalogApiClient


def build_api_clients():
    return ApiClients(
        catalog_api_client=CatalogApiClient()
    )