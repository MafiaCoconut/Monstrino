from dataclasses import dataclass

from application.repositories.parsed_character_repository import ParsedCharactersRepository
from application.repositories.parsed_pet_repository import ParsedPetRepository
from application.repositories.parsed_release_repository import ParsedReleasesRepository
from application.repositories.parsed_series_repository import ParsedSeriesRepository


@dataclass
class Repositories:
    parsed_character: ParsedCharactersRepository
    parsed_pet: ParsedPetRepository
    parsed_series: ParsedSeriesRepository
    parsed_release: ParsedReleasesRepository
