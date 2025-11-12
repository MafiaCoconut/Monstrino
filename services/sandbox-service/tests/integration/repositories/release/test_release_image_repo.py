import logging
import pytest
from monstrino_models.dto import ReleaseImage
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_image_db")
class TestReleaseImageRepo(BaseCrudRepoTest):
    entity_cls = ReleaseImage
    repo_attr = "release_image"
    sample_create_data = {
        "release_id": 3,
        "image_url": "https://example.com/images/frankie_extra.jpg",
        "is_primary": False,
    }
    unique_field = ReleaseImage.IMAGE_URL
    unique_field_value = "https://example.com/images/frankie_extra.jpg"
    update_field = "is_primary"
    updated_value = True
