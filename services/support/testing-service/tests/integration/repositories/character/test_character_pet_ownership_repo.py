import logging
import pytest
from monstrino_models.dto import CharacterPetOwnership
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_list", "seed_pet_list")
class TestCharacterPetOwnershipRepo(BaseCrudRepoTest):
    entity_cls = CharacterPetOwnership
    repo_attr = "character_pet_ownership"
    sample_create_data = {
        "character_id": 2,
        "pet_id": 1,
        "relation_type": "pet_of",
    }
    unique_field = CharacterPetOwnership.ID
    unique_field_value = 1
    update_field = CharacterPetOwnership.PET_ID
    updated_value = 2
