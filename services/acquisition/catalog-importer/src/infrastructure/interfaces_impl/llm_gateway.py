from pydantic import BaseModel


class LLMGateway:
    async def post(self, prompt: str, system_prompt: str, response_format: dict | BaseModel | None):
        ...