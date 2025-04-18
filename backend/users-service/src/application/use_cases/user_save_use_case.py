from application.repositories.users_repository import UsersRepository
from domain.new_user import NewUser
from domain.user import User


class UserSaveUseCase:
    def __init__(
            self,
            users_repository: UsersRepository,
    ):
        self.users_repository = users_repository

    async def execute(self, user: NewUser):
        await self.users_repository.set_user(user)