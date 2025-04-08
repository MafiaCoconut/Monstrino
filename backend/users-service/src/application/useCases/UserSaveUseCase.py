from application.repositories import UsersRepository


class UserSaveUseCase:
    def __init__(
            self,
            usersRepository: UsersRepository,
    ):
        self.usersRepository = usersRepository

    async def execute(self):
        self.usersRepository.setUser()