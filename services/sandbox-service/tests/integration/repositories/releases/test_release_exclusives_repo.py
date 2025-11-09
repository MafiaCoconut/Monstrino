import logging
import pytest
from monstrino_models.dto import ReleaseExclusive
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_exclusives_db")
class TestReleaseExclusivesRepo(BaseCrudRepoTest):
    entity_cls = ReleaseExclusive
    repo_attr = "release_exclusives"
    sample_create_data = {
        "name": "amazon",
        "display_name": "Amazon",
        "description": "Exclusive releases available only on Amazon online store.",
        "image_url": "https://example.com/images/amazon_exclusive.jpg",
    }
    unique_field = ReleaseExclusive.NAME
    unique_field_value = "amazon"
    update_field = "display_name"
    updated_value = "Amazon Exclusive"
