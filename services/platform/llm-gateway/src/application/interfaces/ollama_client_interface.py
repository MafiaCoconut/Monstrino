from typing import Protocol

from domain.vault_obj import OllamaRequest


class OllamaClientInterface(Protocol):
    async def generate(
            self,
            ollama_request: OllamaRequest
    ) -> str:
        ...

    async def tags(self) -> str: ...