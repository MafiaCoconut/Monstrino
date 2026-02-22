from typing import Optional
import logging
from pydantic import BaseModel
from app.interfaces import TextOllamaModelInterface

logger = logging.getLogger(__name__)


class RequestLLMTextUseCase:
    def __init__(
            self,
            text_model: TextOllamaModelInterface
    ):
        # self.ollama_client = ollama_client
        self.text_model =  text_model

    async def execute(
            self,
            prompt: str,
            system: Optional[str],
            response_format: Optional[dict | BaseModel | str] = None
    ) -> str:
        logger.info(f"GenerateTextUseCase execute called with model: {self.text_model.model}")
        return await self.text_model.generate(
            prompt=prompt,
            system=system,
            response_format=response_format
        )