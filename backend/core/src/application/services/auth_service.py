import logging

from application.services.users_service import UsersService
from application.use_сases.auth.jwt_use_case import JwtUseCase
from domain.user import UserRegistration, User, UserBaseInfo, UserLogin
from infrastructure.config.logs_config import log_decorator

logger = logging.getLogger(__name__)


class AuthService:
    def __init__(self,
                 users_service: UsersService
                 ):
        self.users_service = users_service
        self.jwt_use_case = JwtUseCase()

    @log_decorator()
    async def registration(self, user: UserRegistration) -> dict | None:
        user_base_info: UserBaseInfo = await self.users_service.register_new_user(user=user)
        logger.info(f"user_base_info in auth service: {user_base_info}")
        try:
            tokens = await self.update_tokens(user_email=user.email)
            return tokens | {"user": user_base_info}

        except Exception as e:
            logger.error(f"Exception by creating jwt: {e}")

        return None

    @log_decorator()
    async def login(self, user: UserLogin):
        if await self.users_service.login(user=user):
            tokens = await self.update_tokens(user_email=user.email)
            logger.info("Login success")
            return tokens
        else:
            logger.info("Login failed")
            return None


    async def update_tokens(self, user_email: str) -> dict:
        tokens = await self.jwt_use_case.get_new_tokens(user_email=user_email)
        await self.users_service.update_refresh_token(user_email=user_email, refresh_token=tokens.get('refresh_token'))
        return tokens


    @log_decorator()
    async def check_access_token(self, access_token: str):
        pass

    @log_decorator()
    async def refresh(self, refresh_token: str, access_token: str):
        pass