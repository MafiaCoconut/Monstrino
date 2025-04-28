import logging

from application.services.users_service import UsersService
from application.use_сases.auth.jwt_use_case import JwtUseCase
from domain.user import UserRegistration, User, UserBaseInfo
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
            access_token = await self.jwt_use_case.get_new_access_token(user_id=str(user_base_info.id))
            refresh_token = await self.jwt_use_case.get_new_refresh_token(user_id=str(user_base_info.id))

            await self.users_service.update_refresh_token(user_id=user_base_info.id, refresh_token=refresh_token)

            logger.info(f"access_token: {access_token}")
            logger.info(f"refresh_token: {refresh_token}")
            return {"access_token": access_token, "refresh_token": refresh_token, "user": user_base_info}

        except Exception as e:
            logger.error(f"Exception by creating jwt: {e}")

        return None

