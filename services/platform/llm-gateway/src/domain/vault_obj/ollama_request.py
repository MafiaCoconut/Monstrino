from typing import Optional, Any

from pydantic import BaseModel


class OllamaRequest(BaseModel):
    model: str
    prompt: Optional[str] = None
    system: Optional[str] = None
    options: Optional[dict] = None
    format: Optional[str | dict] = "json"
    stream: bool = False
    images: Optional[list[Any]] = None
    # top_p: Optional[float] = None
    # frequency_penalty: Optional[float] = None
    # presence_penalty: Optional[float] = None
    # stop: Optional[list[str]] = None