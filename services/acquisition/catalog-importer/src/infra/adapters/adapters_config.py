import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.container import Adapters
from infra.logging.logger_adapter import LoggerAdapter
from infra.scheduling.scheduler_adapter import SchedulerAdapter


def build_adapters(aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        scheduler=SchedulerAdapter(aps),
    )