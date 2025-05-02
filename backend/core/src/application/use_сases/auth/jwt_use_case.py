from datetime import datetime, UTC, timedelta
from infrastructure.config.jwt_config import AuthJWT


class JwtUseCase:
    def __init__(self):
        self.auth = AuthJWT()

    async def get_new_tokens(self, user_email: str) -> dict:
        return {
            "access_token": await self.get_new_access_token(user_email),
            "refresh_token": await self.get_new_refresh_token(user_email),
        }

    async def get_new_access_token(self, user_email: str) -> str:
        return self.auth.encode_token(
            {
                "sub": "user_email",
                "role": "user",
                "ait": self._get_ait(),
                "exp": self._get_exp_access_token(),
                "iss": "core",
                "aud": "frontend"
            }
        )

    async def get_new_refresh_token(self, user_email: str) -> str:
        return self.auth.encode_token(
            {
                "sub": "user_email",
                "role": "user",
                "ait": self._get_ait(),
                "exp": self._get_exp_access_token(),
                "iss": "core",
                "aud": "frontend"
            }
        )

    async def decode_token(self, token: str) -> dict:
        return self.auth.decode_token(token)

    @staticmethod
    def _get_ait():
        return datetime.now(UTC).timestamp()

    @staticmethod
    def _get_exp_access_token():
        return int((datetime.now(UTC) + timedelta(minutes=30)).timestamp())

    @staticmethod
    def _get_exp_refresh_token():
        return int((datetime.now(UTC) + timedelta(minutes=900)).timestamp())


    # async def check_refresh_token(self, refresh_token: str) -> bool:


