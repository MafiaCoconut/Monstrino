import logging
import pytest
from monstrino_models.dto import ReleaseTypeLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_list", "seed_release_type_list")
class TestReleaseTypeLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseTypeLink
    repo_attr = "release_type_link"
    sample_create_data = {
        "release_id": 1,
        "type_id": 2,
    }
    unique_field = ReleaseTypeLink.ID
    unique_field_value = 1
    update_field = "type_id"
    updated_value = 3
