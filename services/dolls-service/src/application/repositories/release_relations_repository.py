from abc import ABC, abstractmethod


class ReleaseRelationsRepository(ABC):
    @abstractmethod
    async def save(self) -> int:
        pass
