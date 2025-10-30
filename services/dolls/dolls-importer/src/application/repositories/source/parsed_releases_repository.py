from abc import ABC, abstractmethod


class ParsedReleasesRepository(ABC):
    @abstractmethod
    async def save(self, data): ...