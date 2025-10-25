from application.repositories.doll_images_repository import DollsImagesRepository
from application.repositories.dolls_relations_repository import DollsRelationsRepository
from application.repositories.dolls_releases_repository import DollsReleasesRepository
from application.repositories.dolls_series_repository import DollsSeriesRepository
from application.repositories.dolls_types_repository import DollsTypesRepository
from application.repositories.original_characters_repository import OriginalCharactersRepository
from application.repositories.release_characters_repository import ReleaseCharactersRepository
from application.use_cases.dolls.original_characters.manage_original_characters_use_case import \
    ManageOriginalCharactersUseCase
from application.use_cases.dolls.series.manage_dolls_series_use_case import ManageDollsSeriesUseCase
from application.use_cases.dolls.types.manage_dolls_types_use_case import ManageDollsTypesUseCase


class TablesDataManagerService:
    def __init__(self,
                 dolls_types_repo: DollsTypesRepository,
                 dolls_releases_repo: DollsReleasesRepository,
                 dolls_series_repo: DollsSeriesRepository,
                 dolls_images_repo: DollsImagesRepository,
                 dolls_relations_repo: DollsRelationsRepository,
                 original_characters_repo: OriginalCharactersRepository,
                 release_characters_repo: ReleaseCharactersRepository,
                 ):
        self.manage_dolls_types_uc = ManageDollsTypesUseCase(dolls_types_repo)
        self.manage_dolls_series_uc = ManageDollsSeriesUseCase(dolls_series_repo)
        self.manage_original_characters_uc = ManageOriginalCharactersUseCase(original_characters_repo)

    async def get_dolls_type(self, type_id: int):
        return await self.manage_dolls_types_uc.get_doll_type(type_id)

    async def get_dolls_series(self, series_id: int):
        return await self.manage_dolls_series_uc.get_doll_series(series_id)

    async def get_original_character(self, character_id: int):
        return await self.manage_original_characters_uc.get_original_character(character_id)