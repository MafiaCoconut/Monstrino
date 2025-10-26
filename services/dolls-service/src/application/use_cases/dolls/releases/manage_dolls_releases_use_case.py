from application.repositories.dolls_releases_repository import DollsReleasesRepository


class ManageDollsReleasesUseCase:
    def __init__(self, dolls_releases_repo: DollsReleasesRepository):
        self.dolls_releases_repo = dolls_releases_repo

    # async def add_doll_series(self, doll_series_name: str, description: str, display_name: str):
    #     return await self.dolls_releases_repo.add(doll_series_name, description, display_name)

    async def get_doll_series(self, doll_series_id: int):
        return await self.dolls_releases_repo.get(doll_series_id)

    async def get_all_series(self):
        return await self.dolls_releases_repo.get_all()
