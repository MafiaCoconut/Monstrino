from application.repositories.dolls_repository import DollsRepository
from application.use_cases.db_use_case import DBUseCase
from application.use_cases.dolls_provider_use_case import DollsProviderUseCase
from domain.entities.doll import Doll
from domain.entities.new_doll import NewDoll


class CoreService:
    def __init__(
            self,
            dolls_repository: DollsRepository,
    ):
        self.db_use_case = DBUseCase()
        self.dolls_repository = dolls_repository

        self.dolls_provider_use_case = DollsProviderUseCase(
            dolls_repository=dolls_repository,
        )

    async def create_db(self):
        await self.db_use_case.restartDB()

    async def register_new_doll(self, new_doll: NewDoll):
        await self.dolls_provider_use_case.register_new_doll(new_doll=new_doll)

    async def get_doll(self, doll_id: int) -> Doll:
        return await self.dolls_provider_use_case.get_doll(doll_id=doll_id)

