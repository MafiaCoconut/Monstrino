from datetime import datetime
from typing import List
from typing import Optional, Callable
from pydantic import BaseModel, Field

class User(BaseModel):
    id:        int        = Field()
    username:  str        = Field(default=None)
    firstName: str | None = Field(default=None)
    lastName:  str | None = Field(default=None)

    updatedAt: datetime | None = Field(default=None)
    createdAt: datetime | None = Field(default=None)
