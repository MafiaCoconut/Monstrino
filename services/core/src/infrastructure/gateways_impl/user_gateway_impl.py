import logging

import aiohttp
import os
import dotenv

from application.gateways.user_gateway import UsersGateway
from domain.entities.user import UserRegistration, UserBaseInfo, UserLogin

dotenv.load_dotenv()
logger = logging.getLogger(__name__)

class UsersGatewayImpl(UsersGateway):
    def __init__(self):
        self.users_service_address = os.getenv('USERS_SERVICE_ADDRESS')

    async def register_new_user(self, user: UserRegistration) -> dict:
        logger.info(f"{user.model_dump()}")
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    url=self.users_service_address + f"/api/v1/auth/registerNewUser",
                    json=user.model_dump()
            ) as resp:
                result = {}
                match resp.status:
                    case 200:
                        resp_json = await resp.json()
                        logger.info(f"Result after /registerNewUser: {resp_json}")
                        result['user'] = UserBaseInfo(**resp_json.get('result'))
                    case 401:
                        result['error'] = 401
                    case 409:
                        resp_json = await resp.json()
                        result['error'] =  resp_json.get('result')
                    case 500:
                        result['error'] = 500
                return result


    async def get_user_by_id(self, user_id: int):
        pass

    async def get_user_by_username(self, username: str):
        pass

    async def set_refresh_token(self, user_id: int, refresh_token: str, ip: str) -> None:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    url=self.users_service_address + f"/api/v1/auth/setRefreshToken",
                    json={"user_id": user_id, "refresh_token": refresh_token, "ip": ip}
            ) as resp:
                match resp.status:
                    case 200:
                        result = await resp.json()
                        logger.info(f"set_refresh_token result: {result}")
                        return None
                    case 401:
                        return None
                return None

    async def update_refresh_token(self, user_id: int, refresh_token: str, ip: str) -> None:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    url=self.users_service_address + f"/api/v1/auth/updateRefreshToken",
                    json={"user_id": user_id, "refresh_token": refresh_token, "ip": ip}
            ) as resp:
                match resp.status:
                    case 200:
                        result = await resp.json()
                        logger.info(f"update_refresh_token result: {result}")
                        return None
                    case 401:
                        return None
                    case 500:
                        return None
                return None

    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                url=self.users_service_address + "/api/v1/auth/login",
                json={'email': user.email, 'password': user.password}
            ) as resp:
                match resp.status:
                    case 200:
                        result = await resp.json()
                        user_base_info = UserBaseInfo(**result.get('result'))
                        return user_base_info
                    case 404:
                        return None
                return None
                # raise ValidationError(result)

    async def check_refresh_token(self, refresh_token: str) -> bool | None:
        async with aiohttp.ClientSession() as session:
            async with session.get(
                url=self.users_service_address + "/api/v1/auth/checkRefreshToken",
                json={'refresh_token': refresh_token}
            ) as resp:
                match resp.status:
                    case 200:
                        result = await resp.json()

                        if result:
                            return result.get('result')
                        return None
                    case 500:
                        logger.error("Error while checking refresh token")

                return None
