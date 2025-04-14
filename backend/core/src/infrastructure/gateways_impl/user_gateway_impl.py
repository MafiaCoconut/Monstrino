from application.gateways.user_gateway import UsersGateway
from domain.user import NewUser


class UsersGatewayImpl(UsersGateway):
    async def register_new_user(self, user: NewUser):
        pass

    async def get_user_by_id(self, user_id: int):
        pass

    async def get_user_by_username(self, username: str):
        pass
