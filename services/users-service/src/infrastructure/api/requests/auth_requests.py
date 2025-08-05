from pydantic import BaseModel


class SetRefreshTokenRequest(BaseModel):
    user_id: int
    refresh_token: str