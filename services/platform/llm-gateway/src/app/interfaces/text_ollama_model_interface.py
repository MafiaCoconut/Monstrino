from typing import Protocol, Optional, Generic, TypeVar
from pydantic import BaseModel

ModelT = TypeVar("ModelT", bound="str")

class TextOllamaModelInterface(Protocol[ModelT]):
    model: ModelT

    async def generate(
            self,
            prompt: str,
            system: str,
            response_format: Optional[dict | BaseModel | str] = None
    ) -> str:
        ...

