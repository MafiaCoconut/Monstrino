from typing import Any

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories


def get_items():
    return [
        CharacterRole(
            code="main",
            title="Main",
            description="The primary character featured in the release.",
        ),
        CharacterRole(
            code="secondary",
            title="Secondary",
            description="A supporting character included as an accessory or packmate.",
        ),
        CharacterRole(
            code="variant",
            title="Variant",
            description="An alternate version of an existing character (e.g. color or outfit variant).",
        ),
    ]

async def test_seed_character_role(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        await uow.repos.character_role.save_many(get_items())

        all_items = await uow.repos.character_role.get_all()
        assert len(all_items) == len(get_items())