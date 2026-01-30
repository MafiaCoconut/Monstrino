import pytest
from monstrino_models.dto import ReleasePet

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_release_list", "seed_pet_list")
class TestReleasePetRepo(BaseCrudRepoTest):
    entity_cls = ReleasePet
    repo_attr = "release_pet"

    sample_create_data = {
        "release_id": 1,
        "pet_id": 2,
        "standalone_release_id": None,
        "position": 2,
        "name": "perseus",
        "display_name": "Perseus",
        "notes": "Clawdeen’s panther pet.",
        "description": "Black panther cub.",
        "is_uniq_to_release": False,
        "finish_type": "matte",
        "size_variant": "medium",
        "pose_variant": "prowling",
        "colorway": "black-gold",
    }

    unique_field = ReleasePet.ID
    unique_field_value = 1
    update_field = ReleasePet.POSITION
    updated_value = 2