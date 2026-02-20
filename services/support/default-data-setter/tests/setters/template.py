from typing import Any

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories


def get_items():
    return []

async def test_seed_exclusive_vendors(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        await uow.repos.exclusive_vendor.save_many(get_items())

        all_items = await uow.repos.exclusive_vendor.get_all()
        assert len(all_items) == len(get_items())