from application.gateways.user_gateway import UsersGateway
from application.use_cases.users_provider_use_case import UsersProviderUseCase
from domain.entities.user import UserRegistration, UserBaseInfo, UserLogin


class UsersService:
    def __init__(
            self,
            users_gateway: UsersGateway,
    ):
        self.users_gateway = users_gateway
        self.users_provider = UsersProviderUseCase(
            users_gateway=users_gateway,
        )

    async def register_new_user(self, user: UserRegistration) -> dict:
        return await self.users_provider.register_new_user(user=user)

    async def set_refresh_token(self, user_id: int, refresh_token: str, ip: str):
        await self.users_provider.set_refresh_token(user_id=user_id, refresh_token=refresh_token, ip=ip)


    async def update_refresh_token(self, user_id: int, refresh_token: str, ip: str):
        await self.users_provider.update_refresh_token(user_id=user_id, refresh_token=refresh_token, ip=ip)

    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        return await self.users_provider.login(user=user)

    async def check_refresh_token(self, refresh_token: str) -> bool | None:
        return await self.users_provider.check_refresh_token(refresh_token=refresh_token)