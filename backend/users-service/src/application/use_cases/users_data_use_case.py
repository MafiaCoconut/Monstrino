from application.repositories.users_repository import UsersRepository
from application.use_cases.user_get_data_use_case import UserGetDataUseCase
from application.use_cases.user_save_use_case import UserSaveUseCase
from domain.new_user import NewUser
from domain.user import User, UserRegistration, UserBaseInfo


class UsersDataUseCase:
    def __init__(
            self,
            users_repository: UsersRepository
    ):
        self.users_repository = users_repository

        self.user_save_use_case = UserSaveUseCase(
            users_repository=users_repository,
        )

        self.user_get_data_use_case = UserGetDataUseCase(
            users_repository=users_repository,
        )

    async def change_username(self, user_id: int, new_username: str):
        await self.users_repository.update_username(user_id=user_id, new_username=new_username)

    async def register_new_user(self, new_user: UserRegistration) -> UserBaseInfo:
        user_id = await self.user_save_use_case.execute(user=new_user)
        return await self.get_user_base_info(user_id=user_id)

    async def get_user_base_info(self, user_id: int) -> UserBaseInfo:
        return await self.user_get_data_use_case.get_user_base_info(user_id=user_id)

    async def set_refresh_token(self, user_id: int, new_refresh_token: str):
        await self.users_repository.update_refresh_token(user_id=user_id, new_refresh_token=new_refresh_token)