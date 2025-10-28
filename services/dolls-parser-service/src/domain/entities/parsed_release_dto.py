from typing import Optional

from pydantic import BaseModel


class ParsedReleaseDTO(BaseModel):
    name: str
