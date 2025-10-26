from dataclasses import dataclass
from application.repositories.release_images_repository import ReleaseImagesRepository
from application.repositories.release_relations_repository import ReleaseRelationsRepository
from application.repositories.dolls_releases_repository import DollsReleasesRepository
from application.repositories.dolls_series_repository import DollsSeriesRepository
from application.repositories.dolls_types_repository import DollsTypesRepository
from application.repositories.original_characters_repository import OriginalCharactersRepository
from application.repositories.release_characters_repository import ReleaseCharactersRepository


@dataclass
class Repositories:
    dolls_series: DollsSeriesRepository
    dolls_types: DollsTypesRepository
    dolls_releases: DollsReleasesRepository
    release_images: ReleaseImagesRepository
    release_relations: ReleaseRelationsRepository
    release_characters: ReleaseCharactersRepository
    original_characters: OriginalCharactersRepository
