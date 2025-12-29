from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedPet

from domain.entities.parse_scope import ParseScope
from domain.entities.refs import PetRef


class ParsePetPort(Protocol):
    def iter_refs(self, scope: ParseScope, batch_size: int = 30) -> AsyncGenerator[list[PetRef]]:
        """
        Function iterates over pets references (links) based on the given parse scope.
        """
        ...

    async def parse_link(self, link: str) -> ParsedPet:
        """Function parses a single pet from a given link."""
        ...

    def parse_refs(
            self,
            refs: list[PetRef],
            batch_size: int = 10,
            limit: int = 9999999
    ) -> AsyncGenerator[list[ParsedPet]]:
        """
        Function parses a list of pets from a given links
        and yield batches of parsed pets.
        """
        ...

    def parse(self, batch_size: int, limit: int = 9999999) -> AsyncGenerator[list[ParsedPet]]: ...
