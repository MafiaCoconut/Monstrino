from abc import ABC, abstractmethod


class DollsTypesRepository(ABC):
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



