from application.repositories.doll_images_repository import DollsImagesRepository
from application.repositories.dolls_relations_repository import DollsRelationsRepository
from application.repositories.dolls_releases_repository import DollsReleasesRepository
from application.repositories.dolls_series_repository import DollsSeriesRepository
from application.repositories.dolls_types_repository import DollsTypesRepository
from application.repositories.original_mh_characters_repository import OriginalMHCharactersRepository
from application.repositories.release_characters_repository import ReleaseCharactersRepository
from application.use_cases.dolls.types.ManageDollsTypesUseCase import ManageDollsTypesUseCase


class TablesDataManagerService:
    def __init__(self,
                 dolls_types_repo: DollsTypesRepository,
                 dolls_releases_repo: DollsReleasesRepository,
                 dolls_series_repo: DollsSeriesRepository,
                 dolls_images_repo: DollsImagesRepository,
                 dolls_relations_repo: DollsRelationsRepository,
                 original_mh_characters_repo: OriginalMHCharactersRepository,
                 release_characters_repo: ReleaseCharactersRepository,
                 ):
        self.manage_dolls_types_uc = ManageDollsTypesUseCase(dolls_types_repo=dolls_types_repo)

    async def get_dolls_type(self, type_id: int):
        return await self.manage_dolls_types_uc.get_doll_type(type_id)