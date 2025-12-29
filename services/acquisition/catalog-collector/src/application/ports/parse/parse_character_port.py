from typing import Protocol, AsyncGenerator

from monstrino_models.dto import ParsedCharacter

from domain.entities.parse_scope import ParseScope
from domain.entities.refs import CharacterRef


class ParseCharacterPort(Protocol):
    def iter_refs(self, scope: ParseScope, batch_size: int = 30) -> AsyncGenerator[list[CharacterRef]]:
        """
        Function iterates over character references (links) based on the given parse scope.
        """
        ...

    async def parse_link(self, link: str) -> ParsedCharacter:
        """Function parses a single character from a given link."""
        ...
    def parse_refs(
            self,
            refs: list[CharacterRef],
            batch_size: int = 10,
            limit: int = 9999999
    ) -> AsyncGenerator[list[ParsedCharacter]]:
        """
        Function parses a list of characters from a given links
        and yield batches of parsed characters.
        """
        ...

    def parse(self, batch_size: int, limit: int) -> AsyncGenerator[list[ParsedCharacter]]: ...
    def parse_ghouls(self, batch_size: int, limit: int) -> AsyncGenerator[list[ParsedCharacter]]: ...
    def parse_mansters(self, batch_size: int, limit: int) -> AsyncGenerator[list[ParsedCharacter]]: ...


    # async def parse(self, ): ...