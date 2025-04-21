from application.repositories.users_repository import UsersRepository
from application.use_cases.user_save_use_case import UserSaveUseCase
from application.use_cases.users_data_use_case import UsersDataUseCase
from domain.new_user import NewUser
from domain.user import User, UserRegistration, UserBaseInfo


class UserProviderUseCase:
    def __init__(
            self,
            users_repository: UsersRepository,
    ):
        self.users_data_use_case = UsersDataUseCase(
            users_repository=users_repository
        )

    async def register_new_user(self, user: UserRegistration) -> UserBaseInfo:
        return await self.users_data_use_case.register_new_user(new_user=user)

    async def change_username(self, user_id: int, new_username: str):
        await self.users_data_use_case.change_username(user_id=user_id, new_username=new_username)
