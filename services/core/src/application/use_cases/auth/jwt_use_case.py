import logging
from datetime import datetime, UTC, timedelta
from jwt.exceptions import ExpiredSignatureError
from icecream import ic

from infrastructure.config.jwt_config import AuthJWT

logger = logging.getLogger(__name__)

class JwtUseCase:
    def __init__(self):
        self.auth = AuthJWT()

    async def get_new_tokens(self, user_id: int) -> dict:
        return {
            "access_token": await self.get_new_access_token(user_id),
            "refresh_token": await self.get_new_refresh_token(user_id),
        }

    async def regenerate_tokens_by_refresh_token(self, refresh_token: str) -> dict:
        payload = await self.decode_token(refresh_token)
        return {
            "payload": payload,
            "access_token": await self.get_new_access_token(user_id=payload["sub"]),
            "refresh_token": await self.get_new_refresh_token(user_id=payload["sub"]),
        }

    async def get_new_access_token(self, user_id: int) -> str:
        return self.auth.encode_token(
            {
                "sub": str(user_id),                       # Subject
                "role": "user",                       # Role
                "iat": self._get_iat(),               # Issued at
                "exp": self._get_exp_access_token(),  # Expiration Time
                "iss": "core",                        # Issuer (Which services create token)
                "aud": "frontend"                     # Audience
            }
        )

    async def get_new_refresh_token(self, user_id: int) -> str:
        return self.auth.encode_token(
            {
                "sub": str(user_id),                       # Subject
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

    async def is_access_token_expired(self, access_token: str) -> bool:
        """
        Function check if access token is expired or not
        If expired, return True
        If not expired, return False
        """
        try:
            await self.decode_token(access_token)
            return False
        except ExpiredSignatureError as e:
            logger.warning(e)
            return True

    async def is_refresh_token_expired(self, refresh_token: str) -> bool:
        """
        Function check if refresh token is expired or not
        If expired, return True
        If not expired, return False
        """
        print('type(refresh_token)')
        print(type(refresh_token))

        try:
            await self.decode_token(refresh_token)
            return False
        except ExpiredSignatureError as e:
            logger.warning(e)
            return True
