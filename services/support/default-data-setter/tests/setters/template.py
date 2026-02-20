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
    items = get_items()
    async with uow_factory_without_reset_db.create() as uow:
        obj_id = await uow.repos.exclusive_vendor.get_id_by(**{ExclusiveVendor.CODE: items[0].code})
        if obj_id is None:
            await uow.repos.exclusive_vendor.save_many(items)
    
            all_items = await uow.repos.exclusive_vendor.get_all()
            assert len(all_items) == len(items)