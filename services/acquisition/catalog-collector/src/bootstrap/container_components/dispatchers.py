from dataclasses import dataclass

from app.dispatchers.parsing_dispatcher import ParsingDispatcher


@dataclass(frozen=True)
class Dispatchers:
    main: ParsingDispatcher
