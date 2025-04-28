from application.gateways.user_gateway import UsersGateway
from application.use_сases.users_provider_use_case import UsersProviderUseCase
from domain.user import UserRegistration, UserBaseInfo, UserLogin


class UsersService:
    def __init__(
            self,
            users_gateway: UsersGateway,
    ):
        self.users_gateway = users_gateway
        self.users_provider = UsersProviderUseCase(
            users_gateway=users_gateway,
        )

    async def register_new_user(self, user: UserRegistration):
        user_base_info: UserBaseInfo = await self.users_provider.register_new_user(user=user)
        return user_base_info

    async def update_refresh_token(self, user_id: int, refresh_token: str):
        await self.users_provider.set_refresh_token(user_id=user_id, refresh_token=refresh_token)

    async def login(self, user: UserLogin) -> bool:
        return await self.users_provider.login(user=user)