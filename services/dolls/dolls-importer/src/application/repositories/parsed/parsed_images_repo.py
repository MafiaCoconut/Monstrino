from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedImage


class ParsedImagesRepo(ABC):
    @abstractmethod
    async def set(self, data: ParsedImage): ...
