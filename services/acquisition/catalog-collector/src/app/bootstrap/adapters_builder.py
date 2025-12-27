import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container import Adapters
from infrastructure.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.parsers import *
from infrastructure.parsers.mh_archive.mh_archive_release_parser import MHArchiveReleasesParser
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter


def build_adapters(aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        # kafka_producer=KafkaProducerAdapter(
        #     servers=os.getenv("KAFKA_SERVERS")),
        scheduler=SchedulerAdapter(aps),
        mh_archive_parse_characters=MHArchiveCharacterParser(),
        mh_archive_parse_pets=MHArchivePetsParser(),
        mh_archive_parse_series=MHArchiveSeriesParser(),
        mh_archive_parse_release=MHArchiveReleasesParser(),
    )
