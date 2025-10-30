from abc import ABC, abstractmethod


class ParsedPetsRepository(ABC):
    @abstractmethod
    async def save(self, data):
        ...