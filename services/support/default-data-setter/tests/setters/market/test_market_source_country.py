from typing import Any
from uuid import UUID

import pytest
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories
# from monstrino_testing.fixtures.base.ids import SOURCE_MATTEL_SHOP_ID
SOURCE_MATTEL_SHOP_ID = UUID("00000000-0000-0000-0000-000000000001")

def get_items():
    return [
        # Europe
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="FR",
            base_url="https://shopping.mattel.com/fr-fr",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="GR",
            base_url="https://shopping.mattel.com/el-gr",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="IT",
            base_url="https://shopping.mattel.com/it-it",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="ES",
            base_url="https://shopping.mattel.com/es-es",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="DE",
            base_url="https://shopping.mattel.com/de-de",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="GB",
            base_url="https://shopping.mattel.com/en-gb",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="NL",
            base_url="https://shopping.mattel.com/nl-nl",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="PL",
            base_url="https://shopping.mattel.com/pl-pl",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="TR",
            base_url="https://shopping.mattel.com/tr-tr",
            is_active=True,
        ),

        # Americas
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="US",
            base_url="https://shop.mattel.com",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="CA",
            base_url="https://shop.mattel.com/en-ca",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="MX",
            base_url="https://shop.mattel.com/es-mx",
            is_active=True,
        ),
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="BR",
            base_url="https://shop.mattel.com/pt-br",
            is_active=True,
        ),

        # Oceania
        MarketSourceCountry(
            source_id=SOURCE_MATTEL_SHOP_ID,
            country_code="AU",
            base_url="https://shop.mattel.com.au",
            is_active=True,
        ),
    ]



async def test_seed_exclusive_vendors(
    uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        global SOURCE_MATTEL_SHOP_ID
        SOURCE_MATTEL_SHOP_ID = await uow.repos.source.get_id_by(**{Source.CODE: "mattel-shop"})
        
        items = get_items()
        
        obj_id = await uow.repos.market_source_country.get_id_by(**{MarketSourceCountry.BASE_URL: items[0].base_url})
        if obj_id is None:
            await uow.repos.market_source_country.save_many(items)
            
            all_items = await uow.repos.market_source_country.get_all()
            assert len(all_items) == len(items)