from monstrino_models.dto import ReleaseCharacter

from integration.common import BaseCrudRepoTest


class TestReleaseCharacterRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacter
    repo_attr = "release_character"

    sample_create_data = {
        "release_id": 1,
        "character_id": 3,
        "role_id": 1,
        "standalone_release_id": None,
        "position": 2,
        "name": "clawdeen-wolf",
        "display_name": "Clawdeen Wolf",
        "notes": "Werewolf",
        "description": "Fashion-forward werewolf",
        "is_uniq_to_release": False,
        "body_variant": "wolf",
        "articulation_level": "medium",
        "finish_type": "matte",
        "face_variant": "howl",
        "hair_variant": "brown-curls",
    }

    unique_field = ReleaseCharacter.NAME
    unique_field_value = "clawdeen-wolf"
    update_field = ReleaseCharacter.DISPLAY_NAME
    updated_value = "Clawdeen Wolf Updated"