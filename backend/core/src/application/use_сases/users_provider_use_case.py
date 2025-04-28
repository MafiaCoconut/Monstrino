import logging

from application.exceptions.invalid_user_data import InvalidUserData
from application.gateways.user_gateway import UsersGateway
from application.validations.user_validation import UserValidation
from domain.user import UserRegistration, UserBaseInfo, UserLogin
from infrastructure.config.logs_config import log_decorator

system_logger = logging.getLogger('system_logger')
error_logger = logging.getLogger('error_logger')

class UsersProviderUseCase:
    def __init__(
            self,
            users_gateway: UsersGateway,
            ):
        self.users_gateway = users_gateway
        self.user_validation = UserValidation()

    @log_decorator()
    async def register_new_user(self, user: UserRegistration):
        try:
            self.user_validation.validate_new_user(user=user)
        except InvalidUserData as e:
            system_logger.error(f"Exception captured by register new user: {e}")

        user_base_info: UserBaseInfo = await self.users_gateway.register_new_user(user=user)
        return user_base_info

    @log_decorator()
    async def set_refresh_token(self, user_email: str, refresh_token: str):
        await self.users_gateway.set_refresh_token(user_email=user_email, refresh_token=refresh_token)

    @log_decorator()
    async def login(self, user: UserLogin) -> bool:
        return await self.users_gateway.is_user_exists(user=user)