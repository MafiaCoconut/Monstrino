from abc import ABC, abstractmethod


class ParsedCharactersRepo(ABC):
    @abstractmethod
    async def get_unprocessed_characters(self, count: int = 10): ...

    @abstractmethod
    async def set_character_as_processed(self, character_id: int): ...

    @abstractmethod
    async def set_character_as_processed_with_errors(self, character_id: int): ...

