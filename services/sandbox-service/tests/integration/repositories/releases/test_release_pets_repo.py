import logging
import pytest
from monstrino_models.dto import ReleasePet
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_pet_dependencies_db")
class TestReleasePetsRepo(BaseCrudRepoTest):
    entity_cls = ReleasePet
    repo_attr = "release_pets"
    sample_create_data = {
        "release_id": 1,
        "pet_id": 2,
        "position": 1,
    }
    unique_field = ReleasePet.ID
    unique_field_value = 1
    update_field = "position"
    updated_value = 2
