from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class NewDollsSeries(BaseModel):
    id:                   int  = Field()
    name:                 str  = Field()
    description: Optional[str] = Field(default=None)

