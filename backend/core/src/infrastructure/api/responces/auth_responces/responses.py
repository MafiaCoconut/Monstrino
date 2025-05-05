from pydantic import BaseModel

from domain.user import UserBaseInfo
from infrastructure.api.responces.models import ResponseModel, Meta

class JwtTokensModel(BaseModel):
    access_token: str
    refresh_token: str

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

class RefreshResponse(ResponseModel):
    meta: Meta
    result: JwtTokensModel

class StatusResponse(ResponseModel):
    meta: Meta
    result: bool