from datetime import datetime
from typing import List
from typing import Optional, Callable
from pydantic import BaseModel, Field

class Doll(BaseModel):
    model_number: str = Field()
    character: str = Field(default="")
    series: str = Field(default="")
    gender: str = Field(default="")
    released: int = Field(default=0)

    reissue_of: str = Field(default="")
    images: dict = Field(default={})

