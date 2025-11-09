import logging
import pytest
from monstrino_models.dto import ParsedSourceType
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_source_types_db")
class TestParsedSourceTypesRepo(BaseCrudRepoTest):
    entity_cls = ParsedSourceType
    repo_attr = "parsed_source_types"
    sample_create_data = {
        "name": "SITEMAP",
        "description": "XML sitemap files used for structured website crawling.",
        "requires_auth": False,
        "is_active": True,
    }
    unique_field = ParsedSourceType.NAME
    unique_field_value = "SITEMAP"
    update_field = "description"
    updated_value = "Updated description for XML sitemap parsing."
