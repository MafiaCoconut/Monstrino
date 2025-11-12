import logging
import pytest
from monstrino_models.dto import CharacterPetLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_db", "seed_pet_db")
class TestCharacterPetLinkRepo(BaseCrudRepoTest):
    entity_cls = CharacterPetLink
    repo_attr = "character_pet_link"
    sample_create_data = {
        "character_id": 1,
        "pet_id": 2,
        "relation_type": "pet_of",
    }
    unique_field = CharacterPetLink.ID
    unique_field_value = 1
    update_field = "relation_type"
    updated_value = "friend"
