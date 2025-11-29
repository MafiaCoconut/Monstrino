from monstrino_models.dto import ReleasePetImage

from integration.common import BaseCrudRepoTest

class TestReleasePetImageRepo(BaseCrudRepoTest):
    entity_cls = ReleasePetImage
    repo_attr = "release_pet_image"

    sample_create_data = {
        "release_pet_id": 1,
        "image_url": "https://example.com/images/panther_extra.jpg",
        "is_primary": False,
    }

    unique_field = ReleasePetImage.IMAGE_URL
    unique_field_value = "https://example.com/images/panther_extra.jpg"
    update_field = ReleasePetImage.IS_PRIMARY
    updated_value = True