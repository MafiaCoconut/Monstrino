from application.repositories.users_repository import UsersRepository
from domain.user import User


class UserSaveUseCase:
    def __init__(
            self,
            users_repository: UsersRepository,
    ):
        self.users_repository = users_repository

    async def execute(self, user: User):
        await self.users_repository.set_user(user)