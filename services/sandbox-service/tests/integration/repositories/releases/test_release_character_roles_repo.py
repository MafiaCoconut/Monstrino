import logging
import pytest
from monstrino_models.dto import ReleaseCharacterRole
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_character_roles_db")
class TestReleaseCharacterRolesRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacterRole
    repo_attr = "release_character_roles"
    sample_create_data = {
        "name": "guest",
        "description": "A cameo or guest appearance of a character in the release.",
    }
    unique_field = ReleaseCharacterRole.NAME
    unique_field_value = "guest"
    update_field = "description"
    updated_value = "Updated description for guest role."
