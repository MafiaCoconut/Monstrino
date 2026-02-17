import pytest
from monstrino_models.dto import ReleaseCharacter
from monstrino_testing.fixtures.data.catalog.ids import (
    CHARACTER_CLAWDEEN_WOLF_ID,
    CHARACTER_ROLE_VARIANT_ID,
    RELEASE_FRANKIE_SWEET_1600_ID,
    fixture_uuid,
)

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_release_list", "seed_character_list", "seed_character_role_list")
class TestReleaseCharacterRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacter
    repo_attr = "release_character"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_character.clawdeen.variant"),
        "release_id": RELEASE_FRANKIE_SWEET_1600_ID,
        "character_id": CHARACTER_CLAWDEEN_WOLF_ID,
        "role_id": CHARACTER_ROLE_VARIANT_ID,
        "standalone_release_id": None,
        "position": 2,
        "notes": "Werewolf",
        "description": "Fashion-forward werewolf",
        "is_uniq_to_release": False,
        "body_variant": "wolf",
        "articulation_level": "medium",
        "finish_type": "matte",
        "face_variant": "howl",
        "hair_variant": "brown-curls",
    }

    unique_field = ReleaseCharacter.ID
    unique_field_value = fixture_uuid("test.catalog.release_character.clawdeen.variant")
    update_field = ReleaseCharacter.BODY_VARIANT
    updated_value = "Normal"
