from icecream import ic
from monstrino_api.interface import HttpClientInterface

from domain.vault_obj.requests import OllamaClientRequest
from domain.vault_obj.response_tags import OllamaClientResponseTags
from domain.vault_obj.responses import OllamaClientResponse


class OllamaClient:
    def __init__(self, base_url: str, http_client: HttpClientInterface):
        self.base_url = base_url
        self.http_client = http_client

        self.path_generate = "/api/generate"
        self.path_chat = "/api/chat"
        self.path_tags = "/api/tags"

        self.options = {
            "num_ctx": 8192,
            # "num_gpu": 32,
            "num_batch": 64,
            "num_thread": 6,
            "temperature": 0.0,
        }

    async def generate(
            self,
            llm_client_request: OllamaClientRequest,
    ) -> str:
        # ic(llm_client_request)
        llm_client_request.options = self.options

        response: OllamaClientResponse = await self.http_client.post(
            url=self.base_url+self.path_generate,
            payload=llm_client_request,
            response_model=OllamaClientResponse
        )
        return response.response

    async def tags(self) -> str:
        response = await self.http_client.get(
            url=self.base_url+self.path_tags,
            response_model=OllamaClientResponseTags
        )
        return response.response