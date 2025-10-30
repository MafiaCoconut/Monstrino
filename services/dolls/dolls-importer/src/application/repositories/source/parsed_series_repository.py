from abc import ABC, abstractmethod


class ParsedSeriesRepository(ABC):
    @abstractmethod
    async def save(self, data): ...
