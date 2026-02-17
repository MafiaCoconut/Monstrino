import pytest
from monstrino_models.dto import ReleaseCharacter

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_release_list", "seed_character_list", "seed_character_role_list")
class TestReleaseCharacterRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacter
    repo_attr = "release_character"

    sample_create_data = {
        "release_id": 1,
        "character_id": 2,
        "role_id": 1,
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
    unique_field_value = 1
    update_field = ReleaseCharacter.BODY_VARIANT
    updated_value = "Normal"