from monstrino_models.dto import ReleaseCharacterImage

from integration.common import BaseCrudRepoTest


class TestReleaseCharacterImageRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacterImage
    repo_attr = "release_character_image"

    sample_create_data = {
        "release_character_id": 1,
        "image_url": "https://example.com/images/extra.jpg",
        "is_primary": False,
    }

    unique_field = ReleaseCharacterImage.IMAGE_URL
    unique_field_value = "https://example.com/images/extra.jpg"
    update_field = ReleaseCharacterImage.IS_PRIMARY
    updated_value = True