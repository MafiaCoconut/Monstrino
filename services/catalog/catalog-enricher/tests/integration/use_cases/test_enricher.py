import time
from uuid import UUID

import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports.repositories import Repositories
from app.use_cases.enricher import EnricherUseCase


@pytest.mark.asyncio
async def test_collector(
    # uow_factory_with_reset_db: UnitOfWorkFactory[Repositories],
    uow_factory_without_reset_db: UnitOfWorkFactory[Repositories],
    # seed_core_graph,
):
    uc = EnricherUseCase(
        uow_factory_without_reset_db,
    )
    # await process_multiple(uc)
    await process_single(uc)

async def process_single(uc):
    await uc.execute(
        UUID("019da0cb-d80a-7392-9f07-e6ddd24b00f6")
    )

async def process_multiple(uc):
    for i in range(100):
        await uc.execute()
        if i % 20 == 0:
            time.sleep(3)
