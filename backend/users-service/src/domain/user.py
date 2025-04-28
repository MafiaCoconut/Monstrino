from datetime import datetime
from typing import List
from typing import Optional, Callable
from pydantic import BaseModel, Field

class User(BaseModel):
    id:        int        = Field()
    username:  str        = Field(default=None)
    first_name: str | None = Field(default=None)
    last_name:  str | None = Field(default=None)
    email: str | None = Field(default=None)
    password: str | None = Field(default=None)


    updated_at: datetime | None = Field(default=None)
    created_at: datetime | None = Field(default=None)

class UserRegistration(BaseModel):
    username: str  = Field()
    email: str  = Field()
    password: str = Field()

    # firstName: str | None = Field(default=None)
    # lastName:  str | None = Field(default=None)

class UserBaseInfo(BaseModel):
    id:             int  = Field()
    username:       str = Field()
    email:          str = Field()

    updated_at: datetime | str = Field()
    created_at: datetime | str = Field()

class UserLogin(BaseModel):
    email: str = Field()
    password: str = Field()