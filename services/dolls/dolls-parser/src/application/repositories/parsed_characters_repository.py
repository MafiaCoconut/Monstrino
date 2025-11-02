from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedCharacter


class ParsedCharactersRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedCharacter): ...