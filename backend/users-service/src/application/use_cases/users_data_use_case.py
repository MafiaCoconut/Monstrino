from application.repositories.users_repository import UsersRepository
from application.use_cases.user_save_use_case import UserSaveUseCase
from domain.new_user import NewUser
from domain.user import User, UserRegistration


class UsersDataUseCase:
    def __init__(
            self,
            users_repository: UsersRepository
    ):
        self.users_repository = users_repository

        self.user_save_use_case = UserSaveUseCase(
            users_repository=users_repository
        )

    async def change_username(self, user_id: int, new_username: str):
        await self.users_repository.update_username(user_id=user_id, new_username=new_username)

    async def register_new_user(self, new_user: UserRegistration):
        # new_user = User(**user.model_dump())
        await self.user_save_use_case.execute(user=new_user)
