from abc import ABC, abstractmethod


class ParsedPetsRepository(ABC):
    @abstractmethod
    async def get_unprocessed_pets(self, count: int = 10): ...

    @abstractmethod
    async def set_pet_as_processed(self, pet_id: int): ...

    @abstractmethod
    async def set_pet_as_processed_with_errors(self, pet_id: int): ...
