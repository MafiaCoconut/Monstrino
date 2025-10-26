import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container import Adapters
from infrastructure.adapters.kafka_producer_adapter import KafkaProducerAdapter
from infrastructure.adapters.mh_archive_adapter import MHArchiveAdapter
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter


def build_adapters(logger: LoggerAdapter, aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        MHArchive=MHArchiveAdapter(logger),
        logger=logger,
        kafka_producer=KafkaProducerAdapter(servers=os.getenv("KAFKA_SERVERS")),
        scheduler=SchedulerAdapter(aps)
    )