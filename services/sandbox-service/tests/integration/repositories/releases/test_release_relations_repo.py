import logging
import pytest
from monstrino_models.dto import ReleaseRelation
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_relations_dependencies_db")
class TestReleaseRelationsRepo(BaseCrudRepoTest):
    entity_cls = ReleaseRelation
    repo_attr = "release_relations"
    sample_create_data = {
        "release_id": 1,
        "related_release_id": 2,
        "relation_type_id": 2,
        "note": "Variant edition with minor color changes.",
    }
    unique_field = ReleaseRelation.RELEASE_ID
    unique_field_value = 1
    update_field = "note"
    updated_value = "Updated note for variant relation."
