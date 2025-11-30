import json
from typing import Optional, Any

from domain.services import JsonSchemaGenerator
from icecream import ic
from domain.enum import OllamaModels
from domain.vault_obj import OllamaRequest
from infra.interfaces_impl.ollama_client import OllamaClient
from pydantic import BaseModel

class MistralOllamaClient(OllamaClient):
    model = OllamaModels.MISTRAL

    def __init__(self, base_url: str, http_client):
        super().__init__(base_url, http_client)
        self.options = {
            "num_ctx": 4096,
            "num_batch": 32,
            "num_thread": 6,
            "temperature": 0.0,
        }


    async def generate(
            self,
            prompt: str,
            system: str,
            response_format: Optional[dict | BaseModel | str] = None
    ) -> str:
        if response_format:
            if isinstance(response_format, dict):
                format_r = JsonSchemaGenerator.make_schema_from_dict(response_format)
            else:
                format_r = response_format.model_dump_json()
        else:
            format_r = "json"

        return await self._generate(
            OllamaRequest(
                model=OllamaModels.MISTRAL,
                system=system,
                prompt=prompt,
                format=format_r
            )
        )

