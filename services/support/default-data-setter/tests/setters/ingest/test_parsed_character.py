from __future__ import annotations
from typing import Any, Callable, Iterable, Mapping, Optional

import pytest
from icecream import ic

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_testing.fixtures import Repositories

from tests.setters.base.set_table_by_sql import seed_from_sql_file


@pytest.mark.asyncio
async def test_seed_sources(
    uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    result = await seed_from_sql_file(uow_factory_without_reset_db, sql_path="tests/data/parsed_pet.sql")
    ic(result)
    