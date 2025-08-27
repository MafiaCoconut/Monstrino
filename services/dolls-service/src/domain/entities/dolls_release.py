from typing import Optional

from pydantic import BaseModel, Field


class DollsRelease(BaseModel):
    id:            Optional[int]   = Field(default=None)
    type_id:       Optional[int]   = Field()
    character_id:  Optional[int]   = Field()
    name:          Optional[str]   = Field()
    mpn:           Optional[str]   = Field(default=None)
    series_id:     Optional[int]   = Field(default=None)
    year:          Optional[int]   = Field(default=None)
    description:   Optional[str]   = Field(default=None)
    link:          Optional[str]   = Field(default=None)
