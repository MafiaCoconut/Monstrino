from application.repositories.dolls_types_repository import DollsTypesRepository


class ManageDollsTypesUseCase:
    def __init__(self, dolls_types_repo: DollsTypesRepository):
        self.dolls_types_repo = dolls_types_repo

    async def add_doll_type(self, doll_type: str, display_name: str):
        return await self.dolls_types_repo.add(doll_type, display_name)

    async def get_doll_type(self, doll_type_id: int):
        return await self.dolls_types_repo.get(doll_type_id)

    async def get_all_types(self):
        return await self.dolls_types_repo.get_all()
