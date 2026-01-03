import os

from monstrino_infra.adapters import SchedulerAdapter
from pytz import timezone

import pytest
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bootstrap.container_components.adapters import Adapters
from infra.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infra.logging.logger_adapter import LoggerAdapter
from infra.parsers import *
from infra.parsers.mh_archive.mh_archive_release_parser import MHArchiveReleasesParser

@pytest.fixture
async def kafka_adapter():
    adapter = KafkaProducerAdapter(servers=os.getenv("KAFKA_SERVERS"))
    yield adapter
    await adapter.stop()

@pytest.fixture
async def adapters(kafka_adapter):
    return Adapters(
        # kafka_producer=kafka_adapter,
        scheduler=SchedulerAdapter(AsyncIOScheduler(timezone=timezone("Europe/Berlin"))),
        mh_archive_parse_characters=MHArchiveCharacterParser(),
        mh_archive_parse_pets=MHArchivePetsParser(),
        mh_archive_parse_series=MHArchiveSeriesParser(),
        mh_archive_parse_release=MHArchiveReleasesParser(),

    )