import logging
import pytest
from monstrino_models.dto import ImageReferenceOrigin
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_image_reference_origin_list")
class TestImageReferenceOriginRepo(BaseCrudRepoTest):
    entity_cls = ImageReferenceOrigin
    repo_attr = "image_reference_origin"
    sample_create_data = {

        "entity": "Pet",
        "table": "pets",
        "field": "primary_image",
        "description": "Main image reference for pet profiles",
        "relation_type": "one_to_one",
        "is_active": True,
    }
    unique_field = ImageReferenceOrigin.ENTITY
    unique_field_value = "Pet"
    update_field = "is_active"
    updated_value = False
