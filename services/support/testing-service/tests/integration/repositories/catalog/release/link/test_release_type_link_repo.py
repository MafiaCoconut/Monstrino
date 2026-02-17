import logging
import pytest
from monstrino_models.dto import ReleaseTypeLink
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    RELEASE_DRACULAURA_GHOULS_RULE_ID,
    fixture_uuid,
    release_type_id,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_list", "seed_release_type_list")
class TestReleaseTypeLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseTypeLink
    repo_attr = "release_type_link"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_type_link.draculaura.plush"),
        "release_id": RELEASE_DRACULAURA_GHOULS_RULE_ID,
        "type_id": release_type_id("content", "plush"),
    }
    unique_field = ReleaseTypeLink.ID
    unique_field_value = fixture_uuid("test.catalog.release_type_link.draculaura.plush")
    update_field = ReleaseTypeLink.TYPE_ID
    updated_value = release_type_id("content", "vinyl-figure")
