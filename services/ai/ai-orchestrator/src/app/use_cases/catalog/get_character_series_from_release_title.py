import json

from icecream import ic

from app.interfaces import CatalogApiClientInterface
from app.interfaces.llm_client_interface import LLMClientInterface
from domain.enum import OllamaModels
from domain.prompts.system.catalog.release.get_character_series_from_release_title import SYSTEM_PROMPT, SYSTEM_PROMPT1
from domain.services import JsonSchemaGenerator
from domain.services.pydantic_schema_factory import PydanticSchemaFactory
from domain.use_case_responses.catalog.release.get_character_series_from_release_title import GetCharacterSeriesFromReleaseTitleResponse
from domain.vault_obj.requests import OllamaClientRequest


class GetCharacterSeriesFromReleaseTitle:
    def __init__(
        self,
        llm_model: LLMClientInterface,
    ):
        self.llm_model = llm_model
        
        self.system_prompt = SYSTEM_PROMPT
        self.system_prompt = SYSTEM_PROMPT1
        self.prompt = """{release_title}"""
        self.format = PydanticSchemaFactory.for_model(GetCharacterSeriesFromReleaseTitleResponse)
    
    async def execute(self, release_title: str) -> GetCharacterSeriesFromReleaseTitleResponse:
        # ic(self.format)
        result = await self.llm_model.generate(
            OllamaClientRequest(
                # model=OllamaModels.MISTRAL,
                model=OllamaModels.QWEN3_30B,
                prompt=self.prompt.format(release_title=release_title),
                system=self.system_prompt,
                format=self.format
            )
        )
        result_json = json.loads(result)
        ic(result_json)
        dto = GetCharacterSeriesFromReleaseTitleResponse.model_validate(result_json)
        return dto
