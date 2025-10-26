from app.container import Repositories
from application.dto.ReleaseCreateDto import ReleaseCreateDto
from application.use_cases.dolls.releases.create_release_use_case import CreateReleaseUseCase


class ScenariosService:
    def __init__(self,
                 repositories: Repositories
    ):
        self.repositories = repositories

        self.create_release_uc = CreateReleaseUseCase(
            releases_repo=self.repositories.dolls_releases,
            releases_characters_repo=self.repositories.release_characters,
            dolls_images_repo=self.repositories.dolls_images,
            dolls_relations_repo=self.repositories.dolls_relations,
            dolls_types_repo=self.repositories.dolls_types,
            dolls_series_repo=self.repositories.dolls_series,
            original_characters_repo=self.repositories.original_characters
        )

    async def create_release(self, dto: ReleaseCreateDto):
        return await self.create_release_uc.execute(dto=dto)