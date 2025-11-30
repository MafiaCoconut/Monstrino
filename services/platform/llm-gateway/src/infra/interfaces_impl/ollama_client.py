from icecream import ic
from application.interfaces.http_client_interface import HttpClientInterface
from domain.vault_obj import OllamaRequest, OllamaResponse, OllamaResponseTags


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

    async def _generate(
            self,
            ollama_request: OllamaRequest,
    ) -> str:
        # ic(ollama_request)
        ollama_request.options = self.options

        response: OllamaResponse = await self.http_client.post(
            url=self.base_url+self.path_generate,
            payload=ollama_request,
            response_model=OllamaResponse
        )
        ic(response.response)

    async def _tags(self) -> str:
        response = await self.http_client.get(
            url=self.base_url+self.path_tags,
            response_model=OllamaResponseTags
        )
        ic(response.response)