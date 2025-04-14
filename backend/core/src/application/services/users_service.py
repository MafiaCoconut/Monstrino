from application.gateways.user_gateway import UsersGateway
from application.use_сases.users_provider_use_case import UsersProviderUseCase
from domain.user import NewUser


class UsersService:
    def __init__(
            self,
            users_gateway: UsersGateway,
    ):
        self.users_gateway = users_gateway
        self.users_provider = UsersProviderUseCase(
            users_gateway=users_gateway,
        )

    async def register_new_user(self, user: NewUser):
        await self.users_provider.register_new_user(user=user)
