from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedSeries

from domain.entities.parse_scope import ParseScope
from domain.entities.refs import SeriesRef


class ParseSeriesPort(Protocol):
    def iter_refs(self, scope: ParseScope, batch_size: int = 30):
        """Function iterates over series references (links) based on the given parse scope."""
        ...

    async def parse_by_external_id(self, external_id: str) -> list[ParsedSeries]:
        """Function parses a single character from a given external_id."""
        ...

    def parse_refs(
            self,
            refs: list[SeriesRef],
            batch_size: int = 10,
            limit: int = 9999999
    ) -> AsyncGenerator[list[list[ParsedSeries]]]:
        """
        Function parses a list of series from a given links
        and yield batches of parsed series.
        """
        ...

    def parse(self, batch_size: int, limit: int) -> AsyncGenerator[list[list[ParsedSeries]]]: ...
