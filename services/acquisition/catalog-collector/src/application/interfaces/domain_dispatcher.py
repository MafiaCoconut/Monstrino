from typing import Protocol

from application.interfaces.parse_command import ParseCommandInterface


class DomainDispatcherInterface(Protocol):
    async def dispatch(self, command: ParseCommandInterface) -> None: ...