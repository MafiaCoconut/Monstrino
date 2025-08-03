from application.repositories.dolls_repository import DollsRepository
from domain.doll import Doll
from domain.new_doll import NewDoll


class DollDataUseCase:
    def __init__(
            self,
            dolls_repository: DollsRepository,
    ):
        self.dolls_repository = dolls_repository

    async def register_new_doll(self, new_doll: NewDoll):
        await self.dolls_repository.set_doll(doll=new_doll)

    async def get_doll(self, doll_id: int) -> Doll:
        return await self.dolls_repository.get_doll(doll_id=doll_id)