import logging

import aiohttp
import os
import dotenv
from icecream import ic
from pydantic import ValidationError

from application.gateways.user_gateway import UsersGateway
from domain.user import UserRegistration, UserBaseInfo, UserLogin
from infrastructure.config.logs_config import log_decorator

dotenv.load_dotenv()
system_logger = logging.getLogger("system_logger")

class UsersGatewayImpl(UsersGateway):
    def __init__(self):
        self.users_service_address = os.getenv('USERS_SERVICE_ADDRESS')

    async def register_new_user(self, user: UserRegistration):
        system_logger.info(f"{user.model_dump()}")
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    url=self.users_service_address + f"/api/v1/auth/registerNewUser",
                    json=user.model_dump()
            ) as resp:
                result = await resp.json()
                match resp.status:
                    case 200:
                        user_base_info = UserBaseInfo(**result.get('result'))
                        return user_base_info
                    case 401:
                        return None

                return None

    async def get_user_by_id(self, user_id: int):
        pass

    async def get_user_by_username(self, username: str):
        pass

    @log_decorator()
    async def set_refresh_token(self, user_email: str, refresh_token: str) -> None:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    url=self.users_service_address + f"/api/v1/auth/setRefreshToken",
                    json={"user_email": user_email, "refresh_token": refresh_token}
            ) as resp:
                result = await resp.json()
                system_logger.info(f"set_refresh_token result: {result}")
                match resp.status:
                    case 200:
                        return None
                    case 401:
                        return None

                return None

    @log_decorator()
    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                url=self.users_service_address + "/api/v1/auth/login",
                json={'email': user.email, 'password': user.password}
            ) as resp:
                result = await resp.json()
                match resp.status:
                    case 200:
                        user_base_info = UserBaseInfo(**result.get('result'))
                        return user_base_info
                    case 404:
                        return None
                raise ValidationError(result)

