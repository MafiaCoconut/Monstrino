import logging
import pytest
from monstrino_models.dto import ReleaseCharacter
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_character_dependencies_db")
class TestReleaseCharactersRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacter
    repo_attr = "release_characters"
    sample_create_data = {
        "release_id": 1,
        "character_id": 2,
        "role_id": 2,
        "position": 1,
    }
    unique_field = ReleaseCharacter.ID
    unique_field_value = 1
    update_field = "position"
    updated_value = 2
