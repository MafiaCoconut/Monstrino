from dataclasses import dataclass

from application.dispatchers.parsing_dispatcher import ParsingDispatcher


@dataclass(frozen=True)
class Dispatchers:
    main: ParsingDispatcher
