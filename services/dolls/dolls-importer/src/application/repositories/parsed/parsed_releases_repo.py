from abc import ABC, abstractmethod


class ParsedReleasesRepo(ABC):
    @abstractmethod
    async def save(self, data): ...