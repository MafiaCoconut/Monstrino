from application.useCases.UserSaveUseCase import UserSaveUseCase
from domain.User import User


class UserProviderUseCase:
    def __init__(
            self,
            userSaveUseCase: UserSaveUseCase,

    ):
        self.userSaveUseCase = userSaveUseCase


    async def setUser(self, user: User):
        await self.userSaveUseCase.execute()

    async def registerNewUser(self, user: dict):
        newUser = User(**user)
