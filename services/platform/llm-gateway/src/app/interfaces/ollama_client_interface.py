from typing import Protocol


class OllamaRequest:
    pass


class OllamaClientInterface(Protocol):
    async def generate(
            self,
            ollama_request: OllamaRequest
    ) -> str:
        ...

    async def tags(self) -> str: ...