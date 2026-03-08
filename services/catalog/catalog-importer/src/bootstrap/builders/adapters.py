import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from monstrino_infra.adapters import SchedulerAdapter

from bootstrap.container import Adapters


def build_adapters(aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        scheduler=SchedulerAdapter(aps),
    )