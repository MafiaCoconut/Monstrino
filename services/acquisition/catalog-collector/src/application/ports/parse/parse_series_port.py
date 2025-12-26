from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedSeries


class ParseSeriesPort(Protocol):

    def parse(self, batch_size: int, limit: int) -> AsyncGenerator[list[list[ParsedSeries]]]: ...
