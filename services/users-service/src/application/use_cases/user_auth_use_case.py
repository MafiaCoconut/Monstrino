from icecream import ic

from application.repositories.users_repository import UsersRepository
from application.use_cases.users_data_use_case import UsersDataUseCase
from domain.user import UserLogin, UserRegistration, UserBaseInfo


class UserAuthUseCase:
    def __init__(self,
                 users_repository: UsersRepository
        ):
        self.user_repository = users_repository
        self.users_data_use_case = UsersDataUseCase(
            users_repository=users_repository
        )


    async def register_new_user(self, user: UserRegistration) -> UserBaseInfo:
        return await self.users_data_use_case.register_new_user(new_user=user)

    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        return await self.user_repository.login(email=user.email, password=user.password)
