from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

class DollsSeries(BaseModel):
    id:           int        = Field()
    name:         str        = Field()
    description:  str        = Field(default="")

    updated_at: datetime | str | None = Field(default=None)
    created_at: datetime | str | None = Field(default=None)



class NewDollsSeries(BaseModel):
    id:                   int  = Field()
    name:                 str  = Field()
    description: Optional[str] = Field(default=None)
