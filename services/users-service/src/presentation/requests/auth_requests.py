from pydantic import BaseModel


class SetRefreshTokenRequest(BaseModel):
    user_id: int
    refresh_token: str
    ip: str = ""

class CheckRefreshTokenRequest(BaseModel):
    refresh_token: str
