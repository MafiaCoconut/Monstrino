import logging

from application.services.users_service import UsersService
from application.use_cases.auth.jwt_refresh_use_case import JwtRefreshUseCase
from application.use_cases.auth.jwt_use_case import JwtUseCase
from domain.entities.user import UserRegistration, UserLogin

logger = logging.getLogger(__name__)


class AuthService:
    def __init__(self,
                 users_service: UsersService
                 ):
        self.users_service = users_service
        self.jwt_use_case = JwtUseCase()
        self.jwt_refresh_use_case = JwtRefreshUseCase(
            jwt_use_case=self.jwt_use_case,
            users_service=users_service,
        )

    async def registration(self, user: UserRegistration) -> dict | None:
        result = await self.users_service.register_new_user(user=user)
        logger.info(f"Result of registration of new user: {result}")
        if result.get('error') is not None:
            return result
        else:
            try:
                user_id = result.get('user').id
                tokens = await self.update_tokens(user_id=user_id, ip=user.ip)
                return tokens

            except Exception as e:
                logger.error(f"Exception by creating jwt: {e}")
                result['error'] = "internal-error"
        return result

    async def login(self, user: UserLogin) -> dict | None:
        result = await self.users_service.login(user=user)
        print(f"result on login function: {result}")
        if result:
            user_id = result.get('user').id
            tokens = await self.update_tokens(user_id=user_id, ip=user.ip)
            logger.info("Login success")
            return tokens | {"user": result}
        else:
            logger.info("Login failed")
            return None


    async def update_tokens(self, user_id: int, ip: str="") -> dict:
        tokens = await self.jwt_use_case.get_new_tokens(user_id=user_id)
        print("tokens")
        print(tokens)
        await self.users_service.update_refresh_token(user_id=user_id, refresh_token=tokens.get('refresh_token'), ip=ip)
        return tokens


    async def refresh(self, refresh_token: str) -> dict:
        return await self.jwt_refresh_use_case.refresh(refresh_token=refresh_token)

    async def status(self, access_token: str) -> bool:
        return await self.jwt_refresh_use_case.status(access_token=access_token)