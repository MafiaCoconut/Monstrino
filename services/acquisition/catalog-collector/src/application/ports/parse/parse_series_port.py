from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedSeries


class ParseSeriesPort(Protocol):

    def parse(self) -> AsyncGenerator[list[ParsedSeries]]: ...
