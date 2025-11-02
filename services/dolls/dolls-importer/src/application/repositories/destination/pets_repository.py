from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedPet, Pet
from monstrino_models.dto import ParsedSeries
from monstrino_models.dto import ReleaseSeries


class PetsRepository(ABC):
    @abstractmethod
    async def save_unprocessed_pet(self, series: ParsedPet) -> Pet: ...

    @abstractmethod
    async def remove_unprocessed_pet(self, character_id: int): ...

    @abstractmethod
    async def remove_unprocessed_pet_by_id(self, pet_id: int): ...
