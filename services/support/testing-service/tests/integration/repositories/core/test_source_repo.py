import logging
import pytest
from monstrino_models.dto import Source
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.base.ids import *

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_source_type_list", "seed_source_tech_type_list")
class TestSourceRepo(BaseCrudRepoTest):
    entity_cls = Source
    repo_attr = "source"
    sample_create_data = {
        "title": "Instagram Scraper",
        "code": "instagram-scraper",
        "source_type_id": SOURCE_TYPE_WEBSITE_ID,
        "source_tech_type_id": SOURCE_TECH_SHOPIFY_ID,
        "base_url": "https://www.instagram.com/monsterhigh/",
        "description": "Unofficial HTML-based parser for Instagram posts.",
        "is_enabled": True,
    }
    unique_field = Source.TITLE
    unique_field_value = "Instagram Scraper"
    update_field = Source.DESCRIPTION
    updated_value = "Updated parser configuration for Monster High Instagram."
