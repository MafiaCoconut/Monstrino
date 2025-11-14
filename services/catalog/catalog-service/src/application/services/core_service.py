from application.use_cases.db_use_case import DBUseCase


class CoreService:
    def __init__(
            self,
    ):
        self.db_use_case = DBUseCase()
        # self.dolls_repository = dolls_repository

        # self.dolls_provider_use_case = DollsProviderUseCase(
        #     dolls_repository=dolls_repository,
        # )

    async def create_db(self):
        await self.db_use_case.restartDB()


