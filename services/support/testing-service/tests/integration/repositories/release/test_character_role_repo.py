import logging
import pytest
from monstrino_models.dto import CharacterRole
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_role_list")
class TestCharacterRoleRepo(BaseCrudRepoTest):
    entity_cls = CharacterRole
    repo_attr = "character_role"
    sample_create_data = {
        "name": "guest",
        "description": "A cameo or guest appearance of a character in the release.",
    }
    unique_field = CharacterRole.NAME
    unique_field_value = "guest"
    update_field = "description"
    updated_value = "Updated description for guest role."
