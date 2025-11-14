import logging

from application.exceptions.invalid_user_data import InvalidUserData
from application.gateways.user_gateway import UsersGateway
from application.validations.user_validation import UserValidation
from domain.entities.user import UserRegistration, UserBaseInfo, UserLogin

system_logger = logging.getLogger(__name__)

class UsersProviderUseCase:
    def __init__(
            self,
            users_gateway: UsersGateway,
            ):
        self.users_gateway = users_gateway
        self.user_validation = UserValidation()

    async def register_new_user(self, user: UserRegistration) -> dict:
        result = {}
        try:
            self.user_validation.validate_new_user(user=user)
        except InvalidUserData as e:
            system_logger.error(f"Exception captured by register new user: {e}")
            result['error'] = f'not-valid-{e.invalid_type_of_data}'
            return result

        response = await self.users_gateway.register_new_user(user=user)
        return response

    async def login(self, user: UserLogin) -> dict:
        result = {}
        try:
            return await self.users_gateway.login(user=user)
        except Exception as e:
            return {'error': 500}

    async def set_refresh_token(self, user_id: int, refresh_token: str, ip: str) -> None:
        await self.users_gateway.set_refresh_token(user_id=user_id, refresh_token=refresh_token, ip=ip)

    async def update_refresh_token(self, user_id: int, refresh_token: str, ip: str):
        await self.users_gateway.update_refresh_token(user_id=user_id, refresh_token=refresh_token, ip=ip)


    async def check_refresh_token(self, refresh_token: str) -> bool | None:
        return await self.users_gateway.check_refresh_token(refresh_token=refresh_token)