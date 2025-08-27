from abc import ABC, abstractmethod


class OriginalMHCharactersRepository(ABC):
    @abstractmethod
    async def get_id_by_name(self, name: str) -> int:
        pass