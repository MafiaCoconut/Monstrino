from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedRelease


class ParsedReleasesRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedRelease): ...