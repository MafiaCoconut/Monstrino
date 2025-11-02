from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedPet


class ParsedPetsRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedPet):
        ...