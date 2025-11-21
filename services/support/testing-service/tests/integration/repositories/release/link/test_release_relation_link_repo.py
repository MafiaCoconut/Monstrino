import logging
import pytest
from monstrino_models.dto import ReleaseRelationLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_relation_link_list")
class TestReleaseRelationLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseRelationLink
    repo_attr = "release_relation_link"
    sample_create_data = {
        "release_id": 1,
        "related_release_id": 2,
        "relation_type_id": 2,
        "note": "Variant edition with minor color changes.",
    }
    unique_field = ReleaseRelationLink.RELEASE_ID
    unique_field_value = 1
    update_field = "note"
    updated_value = "Updated note for variant relation."
