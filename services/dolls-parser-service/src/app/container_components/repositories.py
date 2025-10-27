from dataclasses import dataclass

from application.repositories.parsed_characters_repository import ParsedCharactersRepository
from application.repositories.parsed_pets_repository import ParsedPetsRepository

@dataclass
class Repositories:
    parsed_characters: ParsedCharactersRepository
    parsed_pets: ParsedPetsRepository
