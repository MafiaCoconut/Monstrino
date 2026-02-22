from typing import Any

import pytest
from monstrino_core.domain.value_objects import ReleaseTypeCategory
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories


def release_type_content_list() -> list[ReleaseType]:
    return [
        ReleaseType(
            code="doll-figure",
            title="Doll Figure",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="playset",
            title="Playset",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="plush",
            title="Plush",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="vinyl-figure",
            title="Vinyl Figure",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="mini-figure",
            title="Mini Figure",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="construction-set",
            title="Construction Set",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="fashion-pack",
            title="Fashion Pack",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="stationery",
            title="Stationery",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="ornament",
            title="Ornament",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="custom-kit",
            title="Custom Kit",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="creature-figure",
            title="Creature Figure",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="vehicle",
            title="Vehicle",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="pet-figure",
            title="Pet Figure",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="digital-toy",
            title="Digital Toy",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="funko-pop",
            title="Funko Pop",
            category=ReleaseTypeCategory.CONTENT
        ),
        ReleaseType(
            code="electrocuties",
            title="Electrocuties",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="monster-cross",
            title="Monster Cross",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="create-a-monster",
            title="Create a monster",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="apptivity-finders-creepers",
            title="Apptivity – Finders Creepers",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="vinyl",
            title="Vinyl",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="fright-mares",
            title="Fright-Mares",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="secret-creepers",
            title="Secret Creepers",
            category=ReleaseTypeCategory.CONTENT,
        ),
        ReleaseType(
            code="monster-maker",
            title="Monster maker",
            category=ReleaseTypeCategory.CONTENT,
        ),
    ]

# -----------------------------
# FULL LIST FIXTURE
# -----------------------------

def release_type_packaging_list() -> list[ReleaseType]:
    return [
        ReleaseType(
            code="1-pack",
            title="1 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="2-pack",
            title="2 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="3-pack",
            title="3 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="4-pack",
            title="4 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="5-pack",
            title="5 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="6-pack",
            title="6 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="7-pack",
            title="7 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="8-pack",
            title="8 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="9-pack",
            title="9 Pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="multi-pack",
            title="Multi-pack",
            category=ReleaseTypeCategory.PACKAGING,
        ),
        ReleaseType(
            code="gift-pack",
            title="Gift Pack",
            category=ReleaseTypeCategory.PACKAGING,
        )
    ]


def release_type_tier_list() -> list[ReleaseType]:
    return [
        ReleaseType(
            code="budget",
            title="Budget",
            category=ReleaseTypeCategory.TIER,
        ),
        ReleaseType(
            code="standard",
            title="Standard",
            category=ReleaseTypeCategory.TIER,
        ),
        ReleaseType(
            code="deluxe",
            title="Deluxe",
            category=ReleaseTypeCategory.TIER,
        ),
        ReleaseType(
            code="collector",
            title="Collector",
            category=ReleaseTypeCategory.TIER,
        )
    ]

def get_items() -> list:
    return release_type_content_list()+release_type_tier_list()+release_type_packaging_list()

async def test_seed_exclusive_vendors(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    items = get_items()
    async with uow_factory_without_reset_db.create() as uow:
        obj_id = await uow.repos.release_type.get_id_by(**{ReleaseType.CODE: items[0].code})
        if obj_id is None:
            await uow.repos.release_type.save_many(items)
    
            all_items = await uow.repos.release_type.get_all()
            assert len(all_items) == len(items)
        else:
            print("Release types already seeded. Skipping seeding and test.")
            print("Release types already seeded. Skipping seeding and test.")