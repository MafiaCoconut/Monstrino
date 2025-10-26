from abc import ABC, abstractmethod

from domain.entities.dolls.new_dolls_series import NewDollsSeries


class DollsSeriesRepository(ABC):
    @abstractmethod
    async def get_all(self):
        pass

    @abstractmethod
    async def add(self, name: str, description: str, display_name: str):
        pass

    @abstractmethod
    async def get(self, type_id: int):
        pass

    @abstractmethod
    async def get_by_name(self, name: str):
        pass