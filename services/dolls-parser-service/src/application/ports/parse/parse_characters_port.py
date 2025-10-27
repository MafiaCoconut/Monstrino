from typing import Protocol

class ParseCharactersPort(Protocol):
    async def parse(self, ): ...