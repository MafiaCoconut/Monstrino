import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container import Adapters
from infrastructure.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infrastructure.adapters.mh_archive_adapter import MHArchiveAdapter
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.parsers.characters_parser import CharactersParser
from infrastructure.parsers.pets_parser import PetsParser
from infrastructure.parsers.releases_parser import ReleasesParser
from infrastructure.parsers.series_parser import SeriesParser
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter


def build_adapters(logger: LoggerAdapter, aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        logger=logger,
        kafka_producer=KafkaProducerAdapter(servers=os.getenv("KAFKA_SERVERS")),
        scheduler=SchedulerAdapter(aps),
        parse_characters=CharactersParser(),
        parse_pets=PetsParser(),
        parse_series=SeriesParser(),
        parse_releases=ReleasesParser(),
    )