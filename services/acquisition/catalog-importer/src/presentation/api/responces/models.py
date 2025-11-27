from pydantic import BaseModel
from typing import Any, Dict, List

class Meta(BaseModel):
    code: int
    message: str
    description: str

class ResponseModel(BaseModel):
    meta: Meta
    result: Any

class ValidationErrorResponseModel(BaseModel):
    meta: Meta
    result: Any
