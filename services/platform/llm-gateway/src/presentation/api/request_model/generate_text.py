from typing import Optional

from pydantic import BaseModel


class GenerateTextRequest(BaseModel):
    prompt: str
    system: str
    response_format: Optional[dict | BaseModel | str] = None