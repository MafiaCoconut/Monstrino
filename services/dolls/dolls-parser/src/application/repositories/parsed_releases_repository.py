from abc import ABC, abstractmethod

from domain.entities.parsed_release_dto import ParsedReleaseDTO
from domain.entities.parsed_series_dto import ParsedSeriesDTO


class ParsedReleasesRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedReleaseDTO): ...