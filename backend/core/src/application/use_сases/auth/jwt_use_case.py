from datetime import datetime, UTC, timedelta
from infrastructure.config.auth_config import auth


class JwtUseCase:
    def __init__(self):
        pass

    async def get_new_tokens(self, user_email: str) -> dict:
        return {
            "access_token": await self.get_new_access_token(user_email),
            "refresh_token": await self.get_new_refresh_token(user_email),
        }

    async def get_new_access_token(self, user_email: str) -> str:
        return auth.create_access_token(
            uid=user_email,
            # ait=self._get_ait(),
            # exp=self._get_exp_access_token(),
            role="user",
        )

    async def get_new_refresh_token(self, user_email: str) -> str:
        return auth.create_refresh_token(
            uid=user_email,
            # ait=self._get_ait(),
            # exp=self._get_exp_refresh_token(),
            role="user",
        )

    @staticmethod
    def _get_ait():
        return datetime.now(UTC).timestamp()

    @staticmethod
    def _get_exp_access_token():
        return int((datetime.now(UTC) + timedelta(minutes=30)).timestamp())

    @staticmethod
    def _get_exp_refresh_token():
        return int((datetime.now(UTC) + timedelta(minutes=900)).timestamp())




