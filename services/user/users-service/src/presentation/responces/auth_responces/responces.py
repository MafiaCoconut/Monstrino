from domain.entities.user import UserBaseInfo
from presentation.responces.models import ResponseModel, Meta


class RegisterUserResponse(ResponseModel):
    meta: Meta
    result: UserBaseInfo

class LoginResponse(ResponseModel):
    meta: Meta
    result: UserBaseInfo