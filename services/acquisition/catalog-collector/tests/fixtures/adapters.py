import os
from pytz import timezone

import pytest
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container_components.adapters import Adapters
from infrastructure.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.parsers import *
from infrastructure.parsers.mh_archive.mh_archive_release_parser import MHArchiveReleasesParser
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter

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