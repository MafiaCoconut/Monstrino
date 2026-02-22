from typing import Any

import pytest
from uuid import UUID

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Source, SourceType, SourceTechType
from monstrino_testing.fixtures import Repositories


# NOTE: placeholders; real IDs will be loaded from DB after seeding types
TYPE_ECOMMERCE_ID     = UUID("00000000-0000-0000-0000-000000000000")
TYPE_WEBSITE_ID       = UUID("00000000-0000-0000-0000-000000000000")
TYPE_WIKI_ID          = UUID("00000000-0000-0000-0000-000000000000")
TYPE_OFFICIAL_API_ID  = UUID("00000000-0000-0000-0000-000000000000")
TYPE_RSS_ID           = UUID("00000000-0000-0000-0000-000000000000")
TYPE_MARKETPLACE_ID   = UUID("00000000-0000-0000-0000-000000000000")
TYPE_INTERNAL_ID      = UUID("00000000-0000-0000-0000-000000000000")

TECH_GENERIC_HTML_ID  = UUID("00000000-0000-0000-0000-000000000000")
TECH_SHOPIFY_ID       = UUID("00000000-0000-0000-0000-000000000000")
TECH_REST_API_ID      = UUID("00000000-0000-0000-0000-000000000000")
TECH_GRAPHQL_ID       = UUID("00000000-0000-0000-0000-000000000000")
TECH_WORDPRESS_ID     = UUID("00000000-0000-0000-0000-000000000000")
TECH_MAGENTO_ID       = UUID("00000000-0000-0000-0000-000000000000")
TECH_STATIC_JSON_ID   = UUID("00000000-0000-0000-0000-000000000000")
TECH_XML_FEED_ID      = UUID("00000000-0000-0000-0000-000000000000")
TECH_RSS_ID           = UUID("00000000-0000-0000-0000-000000000000")


def get_source_types() -> list[SourceType]:
    # Semantic: WHAT the source is
    return [
        SourceType(
            code="ecommerce",
            title="E-Commerce",
            description="Online store selling products directly to customers (first-party or third-party retail).",
            is_enabled=True,
        ),
        SourceType(
            code="website",
            title="Website",
            description="General informational website with semi-structured or editorial content.",
            is_enabled=True,
        ),
        SourceType(
            code="wiki",
            title="Wiki",
            description="Community-maintained knowledge base with versioned pages and cross-linking.",
            is_enabled=True,
        ),
        SourceType(
            code="official_api",
            title="Official API",
            description="Structured official API provided by the content owner (REST/GraphQL).",
            is_enabled=True,
        ),
        SourceType(
            code="rss",
            title="RSS Feed",
            description="RSS/Atom feed with incremental updates (news, announcements, release notes).",
            is_enabled=True,
        ),
        SourceType(
            code="marketplace",
            title="Marketplace",
            description="Third-party marketplace aggregating multiple sellers (listings and price signals).",
            is_enabled=True,
        ),
        SourceType(
            code="internal",
            title="Internal",
            description="Internal or manually maintained source used for overrides, curation, and backfills.",
            is_enabled=True,
        ),
    ]


def get_source_tech_types() -> list[SourceTechType]:
    # Mechanics: HOW we fetch/parse it
    return [
        SourceTechType(
            code="generic_html",
            title="Generic HTML",
            description="Standard HTML pages collected over HTTP and parsed by DOM/BeautifulSoup-like tooling.",
            is_enabled=True,
        ),
        SourceTechType(
            code="shopify",
            title="Shopify",
            description="Shopify storefronts with JSON product endpoints and/or product sitemaps.",
            is_enabled=True,
        ),
        SourceTechType(
            code="rest_api",
            title="REST API",
            description="REST endpoints providing structured JSON payloads.",
            is_enabled=True,
        ),
        SourceTechType(
            code="graphql",
            title="GraphQL",
            description="GraphQL endpoint providing structured data queries.",
            is_enabled=True,
        ),
        SourceTechType(
            code="wordpress",
            title="WordPress",
            description="WordPress-based site using wp-json and/or RSS feeds.",
            is_enabled=True,
        ),
        SourceTechType(
            code="magento",
            title="Magento",
            description="Magento e-commerce platform with catalog endpoints and HTML storefront.",
            is_enabled=True,
        ),
        SourceTechType(
            code="static_json",
            title="Static JSON",
            description="Static JSON files served over HTTP (no auth, predictable paths).",
            is_enabled=True,
        ),
        SourceTechType(
            code="xml_feed",
            title="XML Feed",
            description="Structured XML feed (product catalogs, partner feeds, export dumps).",
            is_enabled=True,
        ),
        SourceTechType(
            code="rss",
            title="RSS",
            description="RSS/Atom feed parser (XML-based).",
            is_enabled=True,
        ),
    ]


def get_sources() -> list[Source]:
    # NOTE: IDs are resolved after seeding types; use globals updated in the seeding function.
    return [
        # --- Monster High / fandom / archive ---
        Source(
            code="mh-archive",
            title="MHArchive",
            source_type_id=TYPE_WIKI_ID,
            source_tech_type_id=TECH_GENERIC_HTML_ID,
            base_url="https://mharchive.com/",
            description="Monster High Archive website for comprehensive doll information.",
            is_enabled=True,
        ),
        Source(
            code="monsterhigh-fandom",
            title="Monster High Wiki (Fandom)",
            source_type_id=TYPE_WIKI_ID,
            source_tech_type_id=TECH_GENERIC_HTML_ID,
            base_url="https://monsterhigh.fandom.com/",
            description="Primary Fandom wiki used for parsing Monster High content.",
            is_enabled=True,
        ),

        # --- Official / Mattel ---
        Source(
            code="mattel-creations",
            title="Mattel Creations",
            source_type_id=TYPE_ECOMMERCE_ID,
            source_tech_type_id=TECH_SHOPIFY_ID,
            base_url="https://creations.mattel.com/",
            description="Official Mattel Creations storefront for limited/exclusive releases.",
            is_enabled=True,
        ),
        Source(
            code="mattel-shop",
            title="Mattel Shop",
            source_type_id=TYPE_ECOMMERCE_ID,
            source_tech_type_id=TECH_SHOPIFY_ID,
            base_url="https://shopping.mattel.com/",
            description="Official Mattel shop storefront (Shopify-based in many regions).",
            is_enabled=True,
        ),

        # --- Retailers (examples, mix of tech) ---
        Source(
            code="smyths-toys-de",
            title="Smyths Toys DE",
            source_type_id=TYPE_ECOMMERCE_ID,
            source_tech_type_id=TECH_GENERIC_HTML_ID,
            base_url="https://www.smythstoys.com/de/de-de/",
            description="German retailer storefront for toys; useful for MSRP and availability signals.",
            is_enabled=True,
        ),
        Source(
            code="target-us",
            title="Target US",
            source_type_id=TYPE_ECOMMERCE_ID,
            source_tech_type_id=TECH_GENERIC_HTML_ID,
            base_url="https://www.target.com/",
            description="US retailer storefront; useful for launch timing and price history signals.",
            is_enabled=False,  # example: disabled until anti-bot strategy is ready
        ),
        Source(
            code="amazon-de",
            title="Amazon DE",
            source_type_id=TYPE_MARKETPLACE_ID,
            source_tech_type_id=TECH_GENERIC_HTML_ID,
            base_url="https://www.amazon.de/",
            description="Marketplace listings; used only for public price signals (careful with ToS/robots).",
            is_enabled=False,
        ),

        # --- News / feeds ---
        Source(
            code="mattel-newsroom",
            title="Mattel Newsroom",
            source_type_id=TYPE_WEBSITE_ID,
            source_tech_type_id=TECH_GENERIC_HTML_ID,
            base_url="https://corporate.mattel.com/news",
            description="Corporate news/press releases; useful for official announcements and dates.",
            is_enabled=True,
        ),
        Source(
            code="monsterhigh-google-alerts-feed",
            title="Monster High Alerts (RSS)",
            source_type_id=TYPE_RSS_ID,
            source_tech_type_id=TECH_RSS_ID,
            base_url="https://example.com/monsterhigh/rss",
            description="Example RSS feed for incremental Monster High announcements and mentions.",
            is_enabled=False,  # example: turned off by default
        ),

        # --- Internal / curation ---
        Source(
            code="monstrino-curation",
            title="Monstrino Curation",
            source_type_id=TYPE_INTERNAL_ID,
            source_tech_type_id=TECH_STATIC_JSON_ID,
            base_url="https://monstrino.local/curation/",
            description="Internal curated overrides/backfills (manual corrections, canonical titles, mappings).",
            is_enabled=True,
        ),
        Source(
            code="monstrino-partner-feed",
            title="Monstrino Partner Feed",
            source_type_id=TYPE_INTERNAL_ID,
            source_tech_type_id=TECH_XML_FEED_ID,
            base_url="https://monstrino.local/feeds/partner.xml",
            description="Internal/partner XML feed for bulk imports and reconciliations.",
            is_enabled=True,
        ),
    ]


@pytest.mark.asyncio
async def test_seed_sources(
    uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories]
):
    source_types = get_source_types()
    tech_types = get_source_tech_types()

    async with uow_factory_without_reset_db.create() as uow:
        # If already seeded, do nothing
        existing_id = await uow.repos.source.get_id_by(**{Source.CODE: "mh-archive"})
        if existing_id is not None:
            return

        # Seed source types
        await uow.repos.source_type.save_many(source_types)
        all_source_types = await uow.repos.source_type.get_all()
        assert len(all_source_types) >= len(source_types)

        # Seed tech types
        await uow.repos.source_tech_type.save_many(tech_types)
        all_tech_types = await uow.repos.source_tech_type.get_all()
        assert len(all_tech_types) >= len(tech_types)

        # Resolve IDs into globals for building Sources
        global TYPE_ECOMMERCE_ID, TYPE_WEBSITE_ID, TYPE_WIKI_ID, TYPE_OFFICIAL_API_ID, TYPE_RSS_ID, TYPE_MARKETPLACE_ID, \
            TYPE_INTERNAL_ID, TECH_GENERIC_HTML_ID, TECH_SHOPIFY_ID, TECH_REST_API_ID, TECH_GRAPHQL_ID, \
            TECH_WORDPRESS_ID, TECH_MAGENTO_ID, TECH_STATIC_JSON_ID, TECH_XML_FEED_ID, TECH_RSS_ID

        TYPE_ECOMMERCE_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "ecommerce"})
        TYPE_WEBSITE_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "website"})
        TYPE_WIKI_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "wiki"})
        TYPE_OFFICIAL_API_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "official_api"})
        TYPE_RSS_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "rss"})
        TYPE_MARKETPLACE_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "marketplace"})
        TYPE_INTERNAL_ID = await uow.repos.source_type.get_id_by(**{SourceType.CODE: "internal"})

        TECH_GENERIC_HTML_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "generic_html"})
        TECH_SHOPIFY_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "shopify"})
        TECH_REST_API_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "rest_api"})
        TECH_GRAPHQL_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "graphql"})
        TECH_WORDPRESS_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "wordpress"})
        TECH_MAGENTO_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "magento"})
        TECH_STATIC_JSON_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "static_json"})
        TECH_XML_FEED_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "xml_feed"})
        TECH_RSS_ID = await uow.repos.source_tech_type.get_id_by(**{SourceTechType.CODE: "rss"})

        # Seed sources
        sources = get_sources()
        await uow.repos.source.save_many(sources)

        all_sources = await uow.repos.source.get_all()
        assert len(all_sources) >= len(sources)