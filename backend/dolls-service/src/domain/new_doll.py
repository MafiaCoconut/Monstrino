from datetime import datetime
from pydantic import BaseModel, Field

class NewDoll(BaseModel):
    owner_id:     int        = Field()

    name:         str | None = Field(default=None)
    series:       str | None = Field(default=None)
    description:  str | None = Field(default=None)
    images:      dict | None = Field(default=None)
