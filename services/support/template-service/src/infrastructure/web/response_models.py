from pydantic import BaseModel
from typing import Any, Dict, List



class Meta(BaseModel):
    code: str
    message: str
    description: str

class ResponseModel(BaseModel):
    meta: Meta
    result: Any

class Price(BaseModel):
    link: str
    price: str


class ValidationErrorResponseModel(BaseModel):
    meta: Meta
    result: Any


responsesCodes = {
    '422': {"model": ResponseModel, 'description': "Validation Error"},
    '404': {"model": ResponseModel, 'description': "Not Found"},
    '500': {"model": ResponseModel, 'description': "Internal Server Error"}
}