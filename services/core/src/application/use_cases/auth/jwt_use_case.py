from datetime import datetime, UTC, timedelta

from icecream import ic

from infrastructure.config.jwt_config import AuthJWT


class JwtUseCase:
    def __init__(self):
        self.auth = AuthJWT()

    async def get_new_tokens(self, user_email: str) -> dict:
        return {
            "access_token": await self.get_new_access_token(user_email),
            "refresh_token": await self.get_new_refresh_token(user_email),
        }

    async def regenerate_tokens_by_refresh_token(self, refresh_token: str) -> dict:
        payload = await self.decode_token(refresh_token)
        return {
            "access_token": await self.get_new_access_token(user_email=payload["sub"]),
            "refresh_token": await self.get_new_refresh_token(user_email=payload["sub"]),
        }

    async def get_new_access_token(self, user_email: str) -> str:
        return self.auth.encode_token(
            {
                "sub": user_email,                    # Subject
                "role": "user",                       # Role
                "iat": self._get_iat(),               # Issued at
                "exp": self._get_exp_access_token(),  # Expiration Time
                "iss": "core",                        # Issuer (Which services create token)
                "aud": "frontend"                     # Audience
            }
        )

    async def get_new_refresh_token(self, user_email: str) -> str:
        return self.auth.encode_token(
            {
                "sub": user_email,                    # Subject
                "role": "user",                       # Role
                "iat": self._get_iat(),               # Issued at
                "exp": self._get_exp_refresh_token(), # Expiration Time
                "iss": "core",                        # Issuer (Which services create token)
                "aud": "frontend"                     # Audience
            }
        )

    async def decode_token(self, token: str) -> dict:
        return self.auth.decode_token(token)

    @staticmethod
    def _get_iat():
        return int(datetime.now(UTC).timestamp())

    @staticmethod
    def _get_exp_access_token():
        return int((datetime.now(UTC) + timedelta(minutes=30)).timestamp())

    @staticmethod
    def _get_exp_refresh_token():
        return int((datetime.now(UTC) + timedelta(minutes=900)).timestamp())

    async def check_access_token(self, access_token: str) -> bool:
        payload = await self.decode_token(access_token)
        if payload["exp"] <= self._get_iat():
            return True
        else:
            return False

    async def check_refresh_token(self, refresh_token: str) -> bool:
        payload = await self.decode_token(refresh_token)
        if payload["exp"] > self._get_iat():
            return True
        else:
            return False
