from icecream import ic

from app.interfaces import CatalogApiClientInterface
from app.interfaces.llm_client_interface import LLMClientInterface
from domain.enum import OllamaModels
from domain.prompts.system.json_extractor import SYSTEM_PROMPT
from domain.vault_obj.requests import OllamaClientRequest


class ProcessReleaseTitleUseCase:
    def __init__(
        self,
        llm_model: LLMClientInterface,
        catalog_api_client: CatalogApiClientInterface
    ):
        self.llm_model = llm_model
        self.catalog_api_client = catalog_api_client
        
        self.prompt = """
            Extract structured metadata from this Monster High release title.
            
            Title:
            "{release_title}"
        """
        self.system_prompt = SYSTEM_PROMPT
        self.format = {
        "type": "object",
          "additionalProperties": False,
          "properties": {
            "characters": { "type": "array", "items": { "type": "string" } },
            "series": { "type": ["string", "null"] },
            "subseries": { "type": ["string", "null"] },
            "release_type": {
              "type": "string",
              "enum": ["doll", "playset", "accessory_pack", "unknown"]
            },
            "pets": { "type": "array", "items": { "type": "string" } },
            "accessory_count": { "type": ["integer", "null"] },
            "accessories": { "type": "array", "items": { "type": "string" } }
          },
          "required": [
            "characters",
            "series",
            "subseries",
            "release_type",
            "pets",
            "accessory_count",
            "accessories"
          ]
        }
        
        
    async def execute(self, release_title: str) -> str:
        release_types = await self._get_release_types()
        release_types_text = str(release_types) if release_types is not None else ""
        
        
        result = await self.llm_model.generate(
            OllamaClientRequest(
                model=OllamaModels.MISTRAL,
                prompt=self.prompt.format(release_title=release_title),
                system=self.system_prompt.format(release_types_list=release_types_text),
                format=self.format
            )
        )
        ic(result)
        return result
    
    async def _get_release_types(self):
        release_types = await self.catalog_api_client.get_release_types()
        return release_types