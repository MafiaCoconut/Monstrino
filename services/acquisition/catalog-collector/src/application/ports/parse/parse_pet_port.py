from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedPet


class ParsePetPort(Protocol):
    def parse(self, batch_size: int = 10, limit: int = 9999999) -> AsyncGenerator[list[ParsedPet]]: ...
