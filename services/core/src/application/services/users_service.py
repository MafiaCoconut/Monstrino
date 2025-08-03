from application.gateways.user_gateway import UsersGateway
from application.use_cases.users_provider_use_case import UsersProviderUseCase
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

    async def register_new_user(self, user: UserRegistration) -> dict:
        return await self.users_provider.register_new_user(user=user)

    async def update_refresh_token(self, user_email: str, refresh_token: str):
        await self.users_provider.set_refresh_token(user_email=user_email, refresh_token=refresh_token)

    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        return await self.users_provider.login(user=user)