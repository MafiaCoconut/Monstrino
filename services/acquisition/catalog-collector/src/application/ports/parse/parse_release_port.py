from datetime import datetime
from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedRelease

from domain.entities.parse_scope import ParseScope
from domain.entities.refs.release_ref import ReleaseRef


class ParseReleasePort(Protocol):
    def iter_refs(self, scope: ParseScope, batch_size: int = 30) -> AsyncGenerator[list[ReleaseRef]]:
        """
        Function iterates over release references (links) based on the given parse scope.
        """
        ...

    def parse(self, year: int, batch_size: int = 10, limit: int = 9999999) -> AsyncGenerator[list[ParsedRelease]]:
        """
        Function parses releases for a given year and yields batches of parsed releases."""
        ...

    def parse_year_range(
            self,
            year_start: int = datetime.now().year,
            year_end: int = datetime.now().year-1,
            batch_size: int = 10, limit: int = 9999999
    ) -> AsyncGenerator[list[ParsedRelease]]:
        """
        Function goes through a range of years
        and yields batches of parsed releases for each year.
        """
        ...

    def parse_refs(
            self,
            refs: list[ReleaseRef],
            batch_size: int = 10,
            limit: int = 9999999
    ) -> AsyncGenerator[list[ParsedRelease]]:
        """
        Function parses a list of release from a given links
        and yield batches of parsed releases.
        """
        ...

    async def parse_link(self, link: str) -> ParsedRelease:
        """
        Function parses a single release from a given link.
        """
        ...
