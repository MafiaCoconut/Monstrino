import logging
import pytest
from monstrino_models.dto import ReleaseExclusiveLink

from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_list", "seed_exclusive_vendor_list")
class TestReleaseExclusiveLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseExclusiveLink
    repo_attr = "release_exclusive_link"
    sample_create_data = {
        "release_id": 1,
        "vendor_id": 2,
    }
    unique_field = ReleaseExclusiveLink.ID
    unique_field_value = 1
    update_field = "vendor_id"
    updated_value = 3
