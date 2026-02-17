import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from monstrino_infra.adapters import SchedulerAdapter

from bootstrap.container_components import Adapters
from infra.parsers.mattel_shopping import MattelShoppingParser


def build_adapters(aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        scheduler=SchedulerAdapter(aps),
        parser_mattel_shop=MattelShoppingParser(),
    )
