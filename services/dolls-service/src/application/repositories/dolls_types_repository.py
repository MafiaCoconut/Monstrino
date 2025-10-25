from abc import ABC, abstractmethod


class DollsTypesRepository(ABC):
    @abstractmethod
    async def save(self) -> int:
        pass
