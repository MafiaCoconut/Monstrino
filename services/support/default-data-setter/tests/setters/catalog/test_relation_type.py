from typing import Any

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories


def get_items():
    return [
        RelationType(
            code="reissue",
            title="Reissue",
            description="Indicates a later re-release of a previous doll or pack.",
        ),
        RelationType(
            code="variant",
            title="Variant",
            description="Represents a variation of a release (e.g., color or packaging differences).",
        ),
        RelationType(
            code="collection_inclusion",
            title="Collection Inclusion",
            description="Marks that this release is part of a specific collection or subline.",
        ),
    ]

async def test_seed_exclusive_vendors(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        await uow.repos.relation_type.save_many(get_items())

        all_items = await uow.repos.relation_type.get_all()
        assert len(all_items) == len(get_items())