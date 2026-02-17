import pytest
from monstrino_models.dto import ReleaseCharacterImage
from monstrino_testing.fixtures.data.catalog.ids import fixture_uuid

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_character_list", "seed_release_list", "seed_release_character_list")
class TestReleaseCharacterImageRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacterImage
    repo_attr = "release_character_image"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_character_image.frankie.extra1"),
        "release_character_id": fixture_uuid("catalog.release_character.frankie.secondary"),
        "image_url": "https://example.com/images/extra.jpg",
        "is_primary": False,
    }

    unique_field = ReleaseCharacterImage.IMAGE_URL
    unique_field_value = "https://example.com/images/extra.jpg"
    update_field = ReleaseCharacterImage.IS_PRIMARY
    updated_value = True
