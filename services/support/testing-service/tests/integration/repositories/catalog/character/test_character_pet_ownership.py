import logging
import pytest
from monstrino_models.dto import CharacterPetOwnership
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    CHARACTER_DRACULAURA_ID,
    PET_COUNT_FABULOUS_ID,
    PET_WATZIT_ID,
    fixture_uuid,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_list", "seed_pet_list")
class TestCharacterPetOwnershipRepo(BaseCrudRepoTest):
    entity_cls = CharacterPetOwnership
    repo_attr = "character_pet_ownership"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.character_pet_ownership.draculaura.watzit"),
        "character_id": CHARACTER_DRACULAURA_ID,
        "pet_id": PET_WATZIT_ID,
    }
    unique_field = CharacterPetOwnership.ID
    unique_field_value = fixture_uuid("test.catalog.character_pet_ownership.draculaura.watzit")
    update_field = CharacterPetOwnership.PET_ID
    updated_value = PET_COUNT_FABULOUS_ID
