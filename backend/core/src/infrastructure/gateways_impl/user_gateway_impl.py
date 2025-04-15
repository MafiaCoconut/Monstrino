import aiohttp
import os
import dotenv
from icecream import ic

from application.gateways.user_gateway import UsersGateway
from domain.user import NewUser

dotenv.load_dotenv()

class UsersGatewayImpl(UsersGateway):
    def __init__(self):
        self.users_service_address = os.getenv('USERS_SERVICE_ADDRESS')

    async def register_new_user(self, user: NewUser):
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    url=self.users_service_address + f"/users/registerNewUser",
                    json={'user': user.model_dump()}
            ) as resp:
                ic(resp)
                match resp.status:
                    case "200":
                        pass
                    case "401":
                        pass

    async def get_user_by_id(self, user_id: int):
        pass

    async def get_user_by_username(self, username: str):
        pass
