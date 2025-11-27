import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container import Adapters
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter


def build_adapters(logger: LoggerAdapter, aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        logger=logger,
        scheduler=SchedulerAdapter(aps),
    )