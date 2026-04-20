import httpx

from domain.vault_obj.requests import OllamaClientRequest
from domain.vault_obj.response_tags import OllamaClientResponseTags
from domain.vault_obj.responses import OllamaClientResponse


class OllamaClient:
    def __init__(self, base_url: str):
        self._client = httpx.AsyncClient(
            base_url=base_url,
            http2=True,
            timeout=120.0,
        )
        self.options = {
            "num_ctx": 8192,
            "num_batch": 64,
            "num_thread": 6,
            "temperature": 0.0,
        }

    async def generate(self, request: OllamaClientRequest) -> str:
        request.options = self.options
        resp = await self._client.post(
            "/api/generate",
            json=request.model_dump(exclude_none=True),
        )
        resp.raise_for_status()
        return OllamaClientResponse.model_validate(resp.json()).response

    async def tags(self) -> OllamaClientResponseTags:
        resp = await self._client.get("/api/tags")
        resp.raise_for_status()
        return OllamaClientResponseTags.model_validate(resp.json())

    async def close(self) -> None:
        await self._client.aclose()