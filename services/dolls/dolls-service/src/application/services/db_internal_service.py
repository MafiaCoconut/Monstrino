from application.use_cases.db_use_case import DBUseCase


class DBInternalService:
    def __init__(self, ):
        self.db_uc = DBUseCase()

    async def restart_db(self):
        await self.db_uc.restartDB()