from typing import Protocol

from domain.vault_obj.requests import BaseLLMClientRequest


class LLMTextClientInterface(Protocol):
    async def generate(self, llm_client_request: BaseLLMClientRequest) -> str:
        ...

    async def tags(self) -> str: ...