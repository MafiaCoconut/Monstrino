from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ReleaseImage(BaseModel):
    id:                       int = Field()
    release_id:               int = Field()
    url:                      str = Field()
    is_primary:              bool = Field()
    width:          Optional[int] = Field(default=None)
    height:         Optional[int] = Field(default=None)

    updated_at: datetime | str | None = Field(default=None)
    created_at: datetime | str | None = Field(default=None)

class SaveReleaseImage(BaseModel):
    url:                      str = Field()
    is_primary:              bool = Field()
    width:          Optional[int] = Field(default=None)
    height:         Optional[int] = Field(default=None)

class ReceiveReleaseImage(BaseModel):
    url:                      str = Field()
    is_primary:              bool = Field()
    width:          Optional[int] = Field(default=None)
    height:         Optional[int] = Field(default=None)