from abc import ABC, abstractmethod


class DollsImagesRepository(ABC):
    @abstractmethod
    async def save(self) -> int:
        pass
