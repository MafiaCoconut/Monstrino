from typing import Protocol, AsyncGenerator

from src.domain import WebsiteRef


class ParseCharacterPort(Protocol):
    def iter_refs(
            self,
            # scope: ParseScope,
            batch_size: int = 10
    ) -> AsyncGenerator[list[WebsiteRef]] :
        """
        Function iterates over releases (links) based on the given parse scope.
        """
        ...

    async def parse_by_external_id(
            self,
            external_id: str,
            # gender: CharacterGender
    ):
        """Function parses a single release from a given external_id."""
        ...
