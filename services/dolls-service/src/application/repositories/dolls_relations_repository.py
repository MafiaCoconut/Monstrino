from abc import ABC, abstractmethod


class DollsRelationsRepository(ABC):
    @abstractmethod
    async def save(self) -> int:
        pass
