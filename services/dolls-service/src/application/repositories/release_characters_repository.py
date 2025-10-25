from abc import ABC, abstractmethod


class ReleaseCharactersRepository(ABC):
    @abstractmethod
    async def save(self) -> int:
        pass
