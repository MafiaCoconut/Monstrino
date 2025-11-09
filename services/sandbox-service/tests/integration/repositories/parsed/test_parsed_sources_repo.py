import logging
import pytest
from monstrino_models.dto import ParsedSource
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_sources_db")
class TestParsedSourcesRepo(BaseCrudRepoTest):
    entity_cls = ParsedSource
    repo_attr = "parsed_sources"
    sample_create_data = {
        "name": "Instagram Scraper",
        "service_type": "html",
        "base_url": "https://www.instagram.com/monsterhigh/",
        "description": "Unofficial HTML-based parser for Instagram posts.",
        "is_enabled": True,
    }
    unique_field = ParsedSource.NAME
    unique_field_value = "Instagram Scraper"
    update_field = "description"
    updated_value = "Updated parser configuration for Monster High Instagram."
