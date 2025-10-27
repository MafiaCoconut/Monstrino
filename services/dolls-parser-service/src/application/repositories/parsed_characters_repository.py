from abc import ABC, abstractmethod

from domain.entities.parsed_character_dto import ParsedCharacterDTO


class ParsedCharactersRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedCharacterDTO):
        ...