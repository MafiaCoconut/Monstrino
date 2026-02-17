import os

from monstrino_infra.adapters import SchedulerAdapter
from pytz import timezone

import pytest
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from bootstrap.container_components import Adapters
from infra.parsers.mattel_shopping import MattelShoppingParser


@pytest.fixture
async def adapters(kafka_adapter):
    return Adapters(
        scheduler=SchedulerAdapter(AsyncIOScheduler(timezone=timezone("Europe/Berlin"))),
        parser_mattel_shop=MattelShoppingParser(),
    )