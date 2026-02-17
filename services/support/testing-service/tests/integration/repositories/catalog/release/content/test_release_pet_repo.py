import pytest
from monstrino_models.dto import ReleasePet
from monstrino_testing.fixtures.data.catalog.ids import (
    PET_WATZIT_ID,
    RELEASE_FRANKIE_SWEET_1600_ID,
    fixture_uuid,
)

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_release_list", "seed_pet_list")
class TestReleasePetRepo(BaseCrudRepoTest):
    entity_cls = ReleasePet
    repo_attr = "release_pet"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_pet.watzit"),
        "release_id": RELEASE_FRANKIE_SWEET_1600_ID,
        "pet_id": PET_WATZIT_ID,
        "standalone_release_id": None,
        "position": 2,
        "notes": "Clawdeen's panther pet.",
        "description": "Black panther cub.",
        "is_uniq_to_release": False,
        "finish_type": "matte",
        "size_variant": "medium",
        "pose_variant": "prowling",
        "colorway": "black-gold",
    }

    unique_field = ReleasePet.ID
    unique_field_value = fixture_uuid("test.catalog.release_pet.watzit")
    update_field = ReleasePet.POSITION
    updated_value = 2
