from pydantic import BaseModel


class SetRefreshTokenRequest(BaseModel):
    user_email: str
    refresh_token: str