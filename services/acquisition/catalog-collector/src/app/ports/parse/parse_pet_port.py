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

    async def parse_by_external_id(self, external_id: str) -> ParsedPet:
        """Function parses a single character from a given external_id."""
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
