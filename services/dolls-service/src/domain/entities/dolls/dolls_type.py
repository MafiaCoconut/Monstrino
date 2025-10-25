from datetime import datetime
from pydantic import BaseModel, Field

class DollsType(BaseModel):
    id:           int        = Field()
    name:         str        = Field()
    display_name: str        = Field()

    updated_at: datetime | str | None = Field(default=None)
    created_at: datetime | str | None = Field(default=None)