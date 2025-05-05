from pydantic import BaseModel

from domain.user import UserBaseInfo
from infrastructure.api.responces.models import ResponseModel, Meta


class RegisterUserResponse(ResponseModel):
    meta: Meta
    result: UserBaseInfo

class LoginResponse(ResponseModel):
    meta: Meta
    result: UserBaseInfo