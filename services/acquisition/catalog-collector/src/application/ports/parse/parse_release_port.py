from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedRelease


class ParseReleasePort(Protocol):
    def parse(self) -> AsyncGenerator[list[ParsedRelease]]: ...
