from abc import ABC, abstractmethod

from domain.entities.parsed_pet_dto import ParsedPetDTO


class ParsedPetsRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedPetDTO):
        ...