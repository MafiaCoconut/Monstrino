from abc import ABC, abstractmethod

from monstrino_models.dto.parsed_character import ParsedCharacter


class CharactersRepository(ABC):
    @abstractmethod
    async def save_unprocessed_character(self, character: ParsedCharacter):
        pass

    @abstractmethod
    async def get_all(self):
        pass

    @abstractmethod
    async def add(self, name: str, display_name: str):
        pass

    @abstractmethod
    async def get(self, type_id: int):
        pass

    @abstractmethod
    async def get_by_name(self, name: str):
        pass