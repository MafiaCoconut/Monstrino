from pydantic import BaseModel

from domain.user import UserBaseInfo
from infrastructure.api.responces.models import ResponseModel, Meta

class UsersTokensResult(BaseModel):
    access_token: str
    refresh_token: str
    user: UserBaseInfo

class RegistrationResponse(ResponseModel):
    meta: Meta
    result: UsersTokensResult

class LoginResponse(ResponseModel):
    meta: Meta
    result: UsersTokensResult