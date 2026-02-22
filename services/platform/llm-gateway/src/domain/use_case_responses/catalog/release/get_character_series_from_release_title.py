from dataclasses import dataclass
from typing import Optional

from pydantic import BaseModel


class Series(BaseModel):
    title: Optional[str] = None
    subseries_title: Optional[str] = None
    
class GetCharacterSeriesFromReleaseTitleResponse(BaseModel):
    characters: Optional[list[str]] = []
    series: Optional[list[Series]] = []
