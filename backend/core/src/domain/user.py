from datetime import datetime
from typing import List
from typing import Optional, Callable
from pydantic import BaseModel, Field

class User(BaseModel):
    id:             int        = Field(default=None)
    username:       str        = Field(default=None)
    firstName:      str | None = Field(default=None)
    lastName:       str | None = Field(default=None)
    email:          str | None = Field(default=None)
    password:       str | None = Field(default=None)

    updatedAt: datetime | None = Field(default=None)
    createdAt: datetime | None = Field(default=None)


class UserRegistration(BaseModel):
    username:  str        = Field(default=None)
    # firstName: str | None = Field(default=None)
    # lastName:  str | None = Field(default=None)
    email:     str | None = Field(default=None)
    password:  str | None = Field(default=None)

class UserBaseInfo(BaseModel):
    id:             int  = Field()
    username:       str = Field()
    email:          str = Field()

    updatedAt: datetime = Field()
    createdAt: datetime = Field()
