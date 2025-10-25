from datetime import datetime
from pydantic import BaseModel, Field


class OriginalCharacter(BaseModel):
    id:                   int = Field()
    name:                 str = Field()
    display_name:         str = Field()
    description:   str | None = Field(default=None)
    alt_names:    list | None = Field(default=None)
    notes:         str | None = Field(default=None)


    updated_at: datetime | str | None = Field(default=None)
    created_at: datetime | str | None = Field(default=None)