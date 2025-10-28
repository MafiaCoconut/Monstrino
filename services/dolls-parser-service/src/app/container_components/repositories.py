from dataclasses import dataclass

from application.repositories.parsed_characters_repository import ParsedCharactersRepository
from application.repositories.parsed_pets_repository import ParsedPetsRepository
from application.repositories.parsed_releases_repository import ParsedReleasesRepository
from application.repositories.parsed_series_repository import ParsedSeriesRepository


@dataclass
class Repositories:
    parsed_characters: ParsedCharactersRepository
    parsed_pets: ParsedPetsRepository
    parsed_series: ParsedSeriesRepository
    parsed_single_releases: ParsedReleasesRepository
