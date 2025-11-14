import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container import Adapters
from infrastructure.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.parsers import *
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter


def build_adapters(logger: LoggerAdapter, aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        logger=logger,
        kafka_producer=KafkaProducerAdapter(
            servers=os.getenv("KAFKA_SERVERS")),
        scheduler=SchedulerAdapter(aps),
        mh_archive_parse_characters=MHArchiveCharactersParser(),
        mh_archive_parse_pets=MHArchivePetsParser(),
        mh_archive_parse_series=MHArchiveSeriesParser(),
        mh_archive_parse_release=MHArchiveReleasesParser(),
    )
