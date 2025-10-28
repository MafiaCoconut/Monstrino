from typing import Protocol, AsyncGenerator

from domain.entities.parsed_release_dto import ParsedReleaseDTO


class ParseReleasesPort(Protocol):
    async def parse(self) -> AsyncGenerator[list[ParsedReleaseDTO]]: ...
