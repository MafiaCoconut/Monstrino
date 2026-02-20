import logging
import pytest
from monstrino_models.dto import SourceType
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_source_type_list")
class TestSourceTypeRepo(BaseCrudRepoTest):
    entity_cls = SourceType
    repo_attr = "source_type"
    sample_create_data = {
        "title": "SITEMAP",
        "description": "XML sitemap files used for structured website crawling.",
        "requires_auth": False,
        "is_active": True,
    }
    unique_field = SourceType.TITLE
    unique_field_value = "SITEMAP"
    update_field = SourceType.DESCRIPTION
    updated_value = "Updated description for XML sitemap parsing."
