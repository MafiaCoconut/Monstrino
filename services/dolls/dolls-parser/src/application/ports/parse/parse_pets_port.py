from typing import Protocol, AsyncGenerator

from domain.entities.parsed_pet_dto import ParsedPetDTO


class ParsePetsPort(Protocol):
    async def parse(self) -> AsyncGenerator[list[ParsedPetDTO]]: ...

    # async def parse(self, ): ...