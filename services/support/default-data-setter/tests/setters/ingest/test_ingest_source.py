from typing import Any

import pytest
from uuid import UUID
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from monstrino_models.dto import *
from monstrino_testing.fixtures import Repositories

HTML_ID    = UUID("00000000-0000-0000-0000-000000000000")
API_ID     = UUID("00000000-0000-0000-0000-000000000000")
RSS_ID     = UUID("00000000-0000-0000-0000-000000000000")
SITEMAP_ID = UUID("00000000-0000-0000-0000-000000000000")

def get_item_types():
    return [
        SourceType(
            code='html',
            title="HTML",
            description="Standard HTML web pages parsed via BeautifulSoup.",
            requires_auth=False,
            is_active=True,
        ),
        SourceType(
            code='api',
            title="API",
            description="REST or GraphQL API endpoints providing structured JSON data.",
            requires_auth=True,
            is_active=True,
        ),
        SourceType(
            code='rss',
            title="RSS",
            description="XML-based RSS feeds for incremental content updates.",
            requires_auth=False,
            is_active=False,
        ),
        SourceType(
            code='sitemap',
            title="SITEMAP",
            description="Source based on Shopify structure where data can be collected via sitemap.xml and JSON.",
            requires_auth=False,
            is_active=False,
        ),
    ]
def get_items():
    return [
        Source(
            code="mh-archive",
            title="MHArchive",
            source_type_id=HTML_ID,
            base_url="https://mharchive.com",
            description="Monster High Archive website for comprehensive doll information.",
            is_enabled=True,
        ),
        Source(
            code="mattel-creations",
            title="Mattel Creations",
            source_type_id=HTML_ID,
            base_url="https://creations.mattel.com",
            description="Official Mattel Creations website for exclusive doll releases.",
            is_enabled=True,
        ),
        Source(
            code="fandom",
            title="Fandom",
            source_type_id=HTML_ID,
            base_url="https://monsterhigh.fandom.com",
            description="Primary Fandom wiki used for parsing Monster High content.",
            is_enabled=True,
        ),
        Source(
            code="rss-feed-collector",
            title="RSS Feed Collector",
            source_type_id=RSS_ID,
            base_url="https://monsterhighnews.example.com",
            description="RSS-based news collector for Monster High announcements.",
            is_enabled=False,
        ),
        Source(
            code="mattel-shop",
            title="Mattel shop",
            source_type_id=SITEMAP_ID,
            base_url="https://shopping.mattel.com",
            description="Official Mattel shop website.",
            is_enabled=True,
        ),
    ]

async def test_seed_sources(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    async with uow_factory_without_reset_db.create() as uow:
        await uow.repos.source_type.save_many(get_item_types())

        all_item_types = await uow.repos.source_type.get_all()
        assert len(all_item_types) == len(get_item_types())

        global HTML_ID, API_ID, RSS_ID, SITEMAP_ID

        HTML_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE:"html"})
        API_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE:"api"})
        RSS_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE:"rss"})
        SITEMAP_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE:"sitemap"})

        await uow.repos.source.save_many(get_items())

        all_vendors = await uow.repos.source.get_all()
        assert len(all_vendors) == len(get_items())