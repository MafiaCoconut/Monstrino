from domain.entities import ParseJobs
from application.dispatchers import (
    ParsingDispatcher,
    ParsingCharactersDispatcher,
    ParsingPetsDispatcher,
    ParsingSeriesDispatcher,
    ParsingReleasesDispatcher
)
from bootstrap.container_components.dispatchers import Dispatchers
from domain.enums import ParseKindEnum


def build_dispatchers(parse_jobs: ParseJobs):
    handlers = {
        ParseKindEnum.CHARACTER: ParsingCharactersDispatcher(_parse_jobs=parse_jobs),
        ParseKindEnum.PET: ParsingPetsDispatcher(_parse_jobs=parse_jobs),
        ParseKindEnum.SERIES: ParsingSeriesDispatcher(_parse_jobs=parse_jobs),
        ParseKindEnum.RELEASE: ParsingReleasesDispatcher(_parse_jobs=parse_jobs),
    }
    return Dispatchers(
        main=ParsingDispatcher(_parse_jobs=parse_jobs, _handlers=handlers)
    )