from abc import ABC, abstractmethod

from sqlalchemy.testing import against


class ParsedSeriesRepo(ABC):
    @abstractmethod
    async def get_unprocessed_series(self, count: int = 10): ...

    @abstractmethod
    async def set_series_as_processed(self, series_id: int): ...

    @abstractmethod
    async def set_series_as_processed_with_errors(self, series_id: int): ...

    @abstractmethod
    async def get_series_by_id(self, series_id: int): ...
