import logging
import pytest
from monstrino_models.dto import ReleaseExclusiveLink

from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    RELEASE_DRACULAURA_GHOULS_RULE_ID,
    exclusive_vendor_id,
    fixture_uuid,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_list", "seed_exclusive_vendor_list")
class TestReleaseExclusiveLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseExclusiveLink
    repo_attr = "release_exclusive_link"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_exclusive_link.draculaura.target"),
        "release_id": RELEASE_DRACULAURA_GHOULS_RULE_ID,
        "vendor_id": exclusive_vendor_id("target"),
    }
    unique_field = ReleaseExclusiveLink.ID
    unique_field_value = fixture_uuid("test.catalog.release_exclusive_link.draculaura.target")
    update_field = "vendor_id"
    updated_value = exclusive_vendor_id("walmart")
