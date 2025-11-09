import logging
import pytest
from monstrino_models.dto import ReleaseRelationType
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_relation_types_db")
class TestReleaseRelationTypesRepo(BaseCrudRepoTest):
    entity_cls = ReleaseRelationType
    repo_attr = "release_relation_types"
    sample_create_data = {
        "name": "crossover",
        "display_name": "Crossover",
        "description": "A collaboration or crossover release between different brands or series.",
    }
    unique_field = ReleaseRelationType.NAME
    unique_field_value = "crossover"
    update_field = "display_name"
    updated_value = "Crossover Edition"
