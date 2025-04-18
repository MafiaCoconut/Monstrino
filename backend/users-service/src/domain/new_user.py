from datetime import datetime
from typing import List
from typing import Optional, Callable
from pydantic import BaseModel, Field

class NewUser(BaseModel):
    username:  str | None = Field(default=None)
    firstName: str | None = Field(default=None)
    lastName:  str | None = Field(default=None)