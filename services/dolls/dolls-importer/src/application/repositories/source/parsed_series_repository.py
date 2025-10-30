from abc import ABC, abstractmethod

from domain.entities.parsed_character_dto import ParsedCharacterDTO
from domain.entities.parsed_series_dto import ParsedSeriesDTO


class ParsedSeriesRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedSeriesDTO): ...
