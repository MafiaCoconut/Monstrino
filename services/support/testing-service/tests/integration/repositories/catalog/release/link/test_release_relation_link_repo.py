import logging
import pytest
from monstrino_models.dto import ReleaseRelationLink
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    RELEASE_DRACULAURA_GHOULS_RULE_ID,
    RELEASE_FRANKIE_SWEET_1600_ID,
    RELATION_TYPE_VARIANT_ID,
    fixture_uuid,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_relation_link_list")
class TestReleaseRelationLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseRelationLink
    repo_attr = "release_relation_link"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_relation_link.frankie.draculaura.variant"),
        "release_id": RELEASE_FRANKIE_SWEET_1600_ID,
        "related_release_id": RELEASE_DRACULAURA_GHOULS_RULE_ID,
        "relation_type_id": RELATION_TYPE_VARIANT_ID,
        "note": "Variant edition with minor color changes.",
    }
    unique_field = ReleaseRelationLink.ID
    unique_field_value = fixture_uuid("test.catalog.release_relation_link.frankie.draculaura.variant")
    update_field = "note"
    updated_value = "Updated note for variant relation."
