from typing import Protocol

from pydantic import BaseModel


class LLMGatewayInterface(Protocol):
    async def post(self, prompt: str, system_prompt: str, response_format: dict | BaseModel | None): ...