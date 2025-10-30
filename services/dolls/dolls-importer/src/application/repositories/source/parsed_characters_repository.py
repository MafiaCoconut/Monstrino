from abc import ABC, abstractmethod


class ParsedCharactersRepository(ABC):
    @abstractmethod
    async def save(self, data):
        ...