from datetime import datetime
from pydantic import BaseModel, Field

class NewGhoul(BaseModel):
    name:           str | None = Field(default=None)
    series:         str | None = Field(default=None)
    character:      str | None = Field(default=None)
    year:           int | None = Field(default=None)
    model_number:   str | None = Field(default=None)
    multi_pack:     str | None = Field(default=None)
    gallery:       dict | None = Field(default=None)
    url:            str | None = Field(default=None)
    description:    str | None = Field(default=None)
    images:        dict | None = Field(default=None)

