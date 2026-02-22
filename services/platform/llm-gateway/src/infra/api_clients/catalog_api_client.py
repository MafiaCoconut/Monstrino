import logging
import os
from typing import Optional

import aiohttp
from dotenv import load_dotenv
from icecream import ic
from monstrino_contracts.v1.domains.catalog.catalog_api_service.responses import GetReleaseTypesResponse
from monstrino_core.domain.errors import RequestIsBlockedError
from monstrino_infra.debug import ic_model

load_dotenv()

logger = logging.getLogger(__name__)


class CatalogApiClient:
    def __init__(self):
        self.url_local = "http://localhost:8003"
        
        self.headers = {}
        
        if os.getenv("MODE") == "development":
            self.url = self.url_local
        else:
            raise ValueError("Unsupported MODE. Please set MODE to 'development' or 'production' in the environment variables.")
        
    async def get_release_types(self) -> Optional[GetReleaseTypesResponse.data]:
        result = await self._request_get(url=self.url+'/api/v1/release-types')
        return result.data
    
    async def _request_get(self, url: str, headers: dict = None, cookies: dict = None) -> Optional[GetReleaseTypesResponse]:
        local_headers = self.headers.copy() if headers is None else headers
        cookies = {} if cookies is None else cookies
        
        async with aiohttp.ClientSession(headers=local_headers, cookies=cookies) as session:
            async with session.get(
                    url,
                    ssl=False,
            ) as resp:
                logger.debug(f"Request on url={self.url} completed with status code={resp.status}")
                if resp.status == 200:
                    data = await resp.json()
                    return GetReleaseTypesResponse.model_validate(data)
                elif resp.status == 403:
                    raise RequestIsBlockedError(f"Request is blocked with status 403")
                else:
                    raise ValueError(f"Unexpected status code: {resp.status}")
                    # raise GetPageError(f"Get page error with status {resp.status}: {url}")
    
    # def get_product(self, product_id):
    #     response = self.api_client.get(f"/products/{product_id}")
    #     return response.json()
    #
    # def list_products(self, category=None):
    #     params = {"category": category} if category else {}
    #     response = self.api_client.get("/products", params=params)
    #     return response.json()