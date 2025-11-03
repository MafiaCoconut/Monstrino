from abc import ABC, abstractmethod

from monstrino_models.dto import ParsedSeries
from monstrino_models.dto import ReleaseSeries


class ReleaseSeriesRepo(ABC):
    @abstractmethod
    async def save_unprocessed_series(self, series: ParsedSeries): ...

    @abstractmethod
    async def remove_unprocessed_series(self, character_id: int): ...

    @abstractmethod
    async def get_parent_id(self, series: ReleaseSeries) -> int:
        """
        Function search for parent series by receiving the exact same series from parsed_series
        :param series:
        :return: int
        """
        ...
