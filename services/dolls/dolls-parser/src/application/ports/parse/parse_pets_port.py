from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedPet


class ParsePetsPort(Protocol):
    def parse(self) -> AsyncGenerator[list[ParsedPet]]: ...

    # async def parse(self, ): ...