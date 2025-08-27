from abc import ABC, abstractmethod


class SeriesRepository(ABC):
    @abstractmethod
    async def get_id_by_name(self, name: str) -> int:
        pass

    @abstractmethod
    async def get_by_id(self, name: str) -> int:
        pass
