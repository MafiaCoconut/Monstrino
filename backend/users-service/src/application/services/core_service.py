from application.repositories.users_repository import UsersRepository
from application.use_cases.db_use_case import DBUseCase
from application.use_cases.user_auth_use_case import UserAuthUseCase
from application.use_cases.user_provider_use_case import UserProviderUseCase
from domain.new_user import NewUser
from domain.user import User, UserRegistration, UserLogin


class CoreService:
    def __init__(
            self,
            users_repository: UsersRepository,

        ):
        self.users_repository = users_repository
        self.users_provider_use_case = UserProviderUseCase(
            users_repository=users_repository,
        )
        self.user_auth_use_case = UserAuthUseCase(
            users_repository=users_repository
        )

        self.dbUseCase = DBUseCase()
    
    async def register_new_user(self, user: UserRegistration):
        return await self.user_auth_use_case.register_new_user(user=user)

    async def login(self, user: UserLogin):
        return await self.user_auth_use_case.login(user=user)

    async def restart_db(self):
        await self.dbUseCase.restartDB()

    async def change_username(self, user_id: int, new_username: str):
        await self.users_provider_use_case.change_username(user_id=user_id, new_username=new_username)

    async def set_refresh_token(self, user_email: str, new_refresh_token: str):
        await self.users_provider_use_case.set_refresh_token(user_email=user_email, new_refresh_token=new_refresh_token)

