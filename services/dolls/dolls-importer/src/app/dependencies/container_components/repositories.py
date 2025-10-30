from dataclasses import dataclass

from application.repositories.source.parsed_characters_repository import ParsedCharactersRepository
from application.repositories.source.parsed_pets_repository import ParsedPetsRepository
from application.repositories.source.parsed_releases_repository import ParsedReleasesRepository
from application.repositories.source.parsed_series_repository import ParsedSeriesRepository
from application.repositories.destination.release_images_repository import ReleaseImagesRepository
from application.repositories.destination.release_relations_repository import ReleaseRelationsRepository
from application.repositories.destination.dolls_releases_repository import DollsReleasesRepository
from application.repositories.destination.dolls_series_repository import DollsSeriesRepository
from application.repositories.destination.reference.dolls_types_repository import DollsTypesRepository
from application.repositories.destination.reference.original_characters_repository import OriginalCharactersRepository
from application.repositories.destination.release_characters_repository import ReleaseCharactersRepository


@dataclass
class Repositories:
    original_characters: OriginalCharactersRepository
    dolls_series: DollsSeriesRepository
    dolls_types: DollsTypesRepository
    dolls_releases: DollsReleasesRepository
    release_images: ReleaseImagesRepository
    release_relations: ReleaseRelationsRepository
    release_characters: ReleaseCharactersRepository

    # Source repositories
    parsed_characters: ParsedCharactersRepository
    parsed_series: ParsedSeriesRepository
    parsed_pets: ParsedPetsRepository
    parsed_releases: ParsedReleasesRepository
