from application.repositories.UsersRepository import UsersRepository
from application.useCases.DBUseCase import DBUseCase
from application.useCases.UserProviderUseCase import UserProviderUseCase


class CoreService:
    def __init__(
            self,
            usersRepository: UsersRepository,

        ):
        self.usersRepository = usersRepository
        self.usersValidatorUseCase = UserProviderUseCase

        self.dbUseCase = DBUseCase()
    
    async def registerNewUser(self, user: dict):
        await self.usersValidatorUseCase.registerNewUser(user)

    async def restartDB(self):
        self.dbUseCase.restartDB()
    