import pytest
from monstrino_models.dto import ReleasePetImage
from monstrino_testing.fixtures.data.catalog.ids import fixture_uuid

from integration.common import BaseCrudRepoTest
@pytest.mark.usefixtures("seed_pet_list", "seed_release_list", "seed_release_pet_list")
class TestReleasePetImageRepo(BaseCrudRepoTest):
    entity_cls = ReleasePetImage
    repo_attr = "release_pet_image"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_pet_image.rockseena.extra"),
        "release_pet_id": fixture_uuid("catalog.release_pet.draculaura.rockseena"),
        "image_url": "https://example.com/images/panther_extra.jpg",
        "is_primary": False,
    }

    unique_field = ReleasePetImage.IMAGE_URL
    unique_field_value = "https://example.com/images/panther_extra.jpg"
    update_field = ReleasePetImage.IS_PRIMARY
    updated_value = True
