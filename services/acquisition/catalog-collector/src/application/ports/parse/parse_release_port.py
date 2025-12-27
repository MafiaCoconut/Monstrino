from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedRelease


class ParseReleasePort(Protocol):
    def parse(self, year_start: int = 2025, year_end: int = 2024, batch_size: int = 10, limit: int = 9999999) -> AsyncGenerator[list[ParsedRelease]]: ...
