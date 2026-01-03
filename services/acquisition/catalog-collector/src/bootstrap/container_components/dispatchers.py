from dataclasses import dataclass

from application.dispatchers import (
    ParsingDispatcher
)


@dataclass(frozen=True)
class Dispatchers:
    main: ParsingDispatcher
    # characters: ParsingCharactersDispatcher
    # pets: ParsingPetsDispatcher
    # series: ParsingSeriesDispatcher
    # releases: ParsingReleasesDispatcher