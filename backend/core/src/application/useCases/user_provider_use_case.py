import logging

from application.exceptions.invalid_user_data import InvalidUserData
from application.gateways.user_gateway import UsersGateway
from application.validations.user_validation import UserValidation
from domain.user import NewUser
from infrastructure.config.logs_config import log_decorator

system_logger = logging.getLogger('system_logger')
error_logger = logging.getLogger('error_logger')

class UserProviderUseCase:
    def __init__(
            self,
            user_gateway: UsersGateway,
            ):
        self.user_gateway = user_gateway
        self.user_validation = UserValidation()

    @log_decorator()
    async def register_new_user(self, user: NewUser):
        try:
            self.user_validation.validate_new_user(user=user)
        except InvalidUserData as e:
            system_logger.error(f"Exception captured by register new user: {e}")

        await self.user_gateway.register_new_user(user=user)