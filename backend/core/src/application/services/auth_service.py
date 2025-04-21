from application.services.users_service import UsersService
from application.use_сases.auth.jwt_use_case import JwtUseCase
from domain.user import UserRegistration, User


class AuthService:
    def __init__(self,
                 users_service: UsersService
                 ):
        self.users_service = users_service
        self.jwt_use_case = JwtUseCase()

    async def registration(self, user: UserRegistration):
        user_id: int = await self.users_service.register_new_user(user=user)
        access_token = await self.jwt_use_case.get_new_access_token(user_id=str(user_id))
        refresh_token = await self.jwt_use_case.get_new_refresh_token(user_id=str(user_id))
        return "Success"