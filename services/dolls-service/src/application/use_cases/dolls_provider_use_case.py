from application.repositories.dolls_repository import DollsRepository
from application.use_cases.doll_data_use_case import DollDataUseCase
from domain.entities.doll import Doll
from domain.entities.new_doll import NewDoll


class DollsProviderUseCase:
    def __init__(
            self,
            dolls_repository: DollsRepository
    ):
        self.dolls_repository = dolls_repository

        self.doll_data_use_case = DollDataUseCase(
            dolls_repository=dolls_repository
        )

    async def register_new_doll(self, new_doll: NewDoll):
        await self.doll_data_use_case.register_new_doll(new_doll=new_doll)

    async def get_doll(self, doll_id: int) -> Doll:
        return await self.doll_data_use_case.get_doll(doll_id=doll_id)
