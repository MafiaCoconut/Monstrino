import httpx

from domain.vault_obj.requests import KIConnectClientRequest


class KIConnectClient:
    def __init__(self, api_key: str):
        self._client = httpx.AsyncClient(
            base_url="https://chat.kiconnect.nrw/api/v1",
            http2=True,
            timeout=120.0,
            headers={"Authorization": f"Bearer {api_key}"},
        )

    async def generate(self, request: KIConnectClientRequest) -> str:
        resp = await self._client.post(
            "/chat/completions",
            json=request.model_dump(exclude_none=True),
        )
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]

    async def close(self) -> None:
        await self._client.aclose()
