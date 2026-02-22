from typing import Any

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories


def get_items():
    return [
        ExclusiveVendor(
            code="amazon",
            title="Amazon",
            description="Exclusive release available only at Amazon.",
            image_url="https://example.com/images/amazon.jpg",
        ),
        ExclusiveVendor(
            code="costco",
            title="Costco",
            description="Exclusive release available only at Costco.",
            image_url="https://example.com/images/costco_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="entertainment-earth",
            title="Entertainment Earth",
            description="Exclusive release available through Entertainment Earth.",
            image_url="https://example.com/images/entertainment_earth_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="fang-club",
            title="Fang Club",
            description="Exclusive release for members of the Fang Club.",
            image_url="https://example.com/images/fang_club_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="jcpenney",
            title="JCPenney",
            description="Exclusive release available at JCPenney stores.",
            image_url="https://example.com/images/jcpenney_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="justice",
            title="Justice",
            description="Exclusive release available at Justice.",
            image_url="https://example.com/images/justice_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="kmart",
            title="Kmart",
            description="Exclusive release available at Kmart.",
            image_url="https://example.com/images/kmart_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="kohl-s",
            title="Kohl's",
            description="Exclusive release available at Kohl's.",
            image_url="https://example.com/images/kohls_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="mattel-creations",
            title="Mattel Creations",
            description="Collector-exclusive release from Mattel Creations.",
            image_url="https://example.com/images/mattel_creations_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="mattel-shop",
            title="Mattel Shop",
            description="Exclusive release available via the official Mattel Shop.",
            image_url="https://example.com/images/mattel_shop_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="sam-s-club",
            title="Sam's Club",
            description="Exclusive release available at Sam's Club.",
            image_url="https://example.com/images/sams_club_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="san-diego-comic-con",
            title="San Diego Comic-Con",
            description="Convention-exclusive release for San Diego Comic-Con.",
            image_url="https://example.com/images/sdcc_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="target",
            title="Target",
            description="Exclusive release available at Target.",
            image_url="https://example.com/images/target_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="toys-r-us",
            title='Toys"R"Us',
            description='Exclusive release available at Toys"R"Us.',
            image_url="https://example.com/images/toysrus_exclusive.jpg",
        ),
        ExclusiveVendor(
            code="walmart",
            title="Walmart",
            description="Exclusive release available at Walmart.",
            image_url="https://example.com/images/walmart_exclusive.jpg",
        ),
    ]

async def test_seed_exclusive_vendors(uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]):
    items = get_items()
    async with uow_factory_without_reset_db.create() as uow:
        obj_id = await uow.repos.exclusive_vendor.get_id_by(**{ExclusiveVendor.CODE: items[0].code})
        if obj_id is None:
            await uow.repos.exclusive_vendor.save_many(items)
    
            all_vendors = await uow.repos.exclusive_vendor.get_all()
            assert len(all_vendors) == len(items)