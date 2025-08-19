from application.repositories.users_repository import UsersRepository
from domain.entities.user import UserRegistration


class UserSaveUseCase:
    def __init__(
            self,
            users_repository: UsersRepository,
    ):
        self.users_repository = users_repository

    async def execute(self, user: UserRegistration) -> int:
        return await self.users_repository.set_user(user)