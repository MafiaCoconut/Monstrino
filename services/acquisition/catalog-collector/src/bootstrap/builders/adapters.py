import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from monstrino_infra.adapters import SchedulerAdapter

from bootstrap.container import Adapters
from infra.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infra.logging.logger_adapter import LoggerAdapter
from infra.parsers import *
from infra.parsers.mh_archive.mh_archive_release_parser import MHArchiveReleasesParser


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
