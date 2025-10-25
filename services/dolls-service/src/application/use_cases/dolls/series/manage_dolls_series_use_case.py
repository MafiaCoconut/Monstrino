from application.repositories.dolls_series_repository import DollsSeriesRepository


class ManageDollsSeriesUseCase:
    def __init__(self, dolls_series_repo: DollsSeriesRepository):
        self.dolls_series_repo = dolls_series_repo

    async def add_doll_series(self, doll_series_name: str, description: str):
        return await self.dolls_series_repo.add(doll_series_name, description)

    async def get_doll_series(self, doll_series_id: int):
        return await self.dolls_series_repo.get(doll_series_id)

    async def get_all_series(self):
        return await self.dolls_series_repo.get_all()
