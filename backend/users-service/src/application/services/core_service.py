from application.repositories.users_repository import UsersRepository
from application.use_cases.db_use_case import DBUseCase
from application.use_cases.user_provider_use_case import UserProviderUseCase
from domain.new_user import NewUser
from domain.user import User


class CoreService:
    def __init__(
            self,
            users_repository: UsersRepository,

        ):
        self.users_repository = users_repository
        self.users_provider_use_case = UserProviderUseCase(
            users_repository=users_repository,
        )

        self.dbUseCase = DBUseCase()
    
    async def register_new_user(self, user: NewUser):
        await self.users_provider_use_case.register_new_user(user)

    async def restart_db(self):
        await self.dbUseCase.restartDB()

    async def change_username(self, user_id: int, new_username: str):
        await self.users_provider_use_case.change_username(user_id=user_id, new_username=new_username)