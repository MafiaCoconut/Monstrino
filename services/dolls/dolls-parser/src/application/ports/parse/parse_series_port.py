from typing import Protocol, AsyncGenerator

from domain.entities.parsed_pet_dto import ParsedPetDTO
from domain.entities.parsed_series_dto import ParsedSeriesDTO


class ParseSeriesPort(Protocol):
    async def parse(self) -> AsyncGenerator[list[ParsedSeriesDTO]]: ...
