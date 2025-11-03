from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedCharacter


class CharactersRepo(ABC):
    @abstractmethod
    async def save_unprocessed_character(self, character: ParsedCharacter):
        pass

    @abstractmethod
    async def remove_unprocessed_character(self, character_id: int): ...

    @abstractmethod
    async def get_id_by_display_name(self, character_name: str): ...

    @abstractmethod
    async def get_id_by_name(self, character_name: str): ...
