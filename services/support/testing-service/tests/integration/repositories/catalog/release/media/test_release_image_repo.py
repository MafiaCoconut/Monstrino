import logging
import pytest
from monstrino_models.dto import ReleaseImage
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    RELEASE_FRANKIE_SWEET_1600_ID,
    fixture_uuid,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_list",)
class TestReleaseImageRepo(BaseCrudRepoTest):
    entity_cls = ReleaseImage
    repo_attr = "release_image"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_image.frankie.extra"),
        "release_id": RELEASE_FRANKIE_SWEET_1600_ID,
        "image_url": "https://example.com/images/frankie_extra.jpg",
        "is_primary": True,
    }
    unique_field = ReleaseImage.IMAGE_URL
    unique_field_value = "https://example.com/images/frankie_extra.jpg"
    update_field = ReleaseImage.IS_PRIMARY
    updated_value = False
