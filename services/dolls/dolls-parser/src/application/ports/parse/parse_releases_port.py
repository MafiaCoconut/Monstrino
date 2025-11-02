from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedRelease


class ParseReleasesPort(Protocol):
    def parse(self) -> AsyncGenerator[list[ParsedRelease]]: ...
