from app.container import Repositories
from application.dto.ReleaseCreateDto import ReleaseCreateDto
from application.use_cases.dolls.release.create_release_use_case import CreateReleaseUseCase


class ScenariosService:
    def __init__(self,
                 repositories: Repositories
                 ):
        self.repositories = repositories

        self.create_release_uc = CreateReleaseUseCase(
            release_repo=self.repositories.dolls_release,
            release_characters_repo=self.repositories.release_character_link,
            release_image_repo=self.repositories.release_image,
            release_relation_link_repo=self.repositories.release_relation_link,
            dolls_types_repo=self.repositories.dolls_types,
            dolls_series_repo=self.repositories.dolls_series,
            original_characters_repo=self.repositories.original_characters
        )

    async def create_release(self, dto: ReleaseCreateDto):
        return await self.create_release_uc.execute(dto=dto)
