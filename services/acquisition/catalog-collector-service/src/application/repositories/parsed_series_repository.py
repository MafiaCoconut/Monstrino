from abc import ABC, abstractmethod
from typing import Optional

from monstrino_models.dto import ParsedSeries


class ParsedSeriesRepository(ABC):
    @abstractmethod
    async def save(self, data: ParsedSeries): ...

    @abstractmethod
    async def get_by_name(self, series_name: str) -> Optional[ParsedSeries]: ...

    @abstractmethod
    async def get_parent_series(self, series_name: str) -> Optional[ParsedSeries]: ...

    @abstractmethod
    async def set_parent_id(self, parsed_series: ParsedSeries) -> None: ...

    @abstractmethod
    async def remove_by_parent_id_error(self, parsed_series: ParsedSeries) -> None: ...