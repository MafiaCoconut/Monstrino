from datetime import datetime
from typing import List
from typing import Optional, Callable
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int = Field(default=None)
    username: str = Field(default=None)
    firstName: str
    lastName: str

    updatedAt: datetime
    createdAt: datetime
