import logging
import pytest
from monstrino_models.dto import ImageReferenceOrigin
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_image_reference_origin_db")
class TestImageReferenceOriginRepo(BaseCrudRepoTest):
    entity_cls = ImageReferenceOrigin
    repo_attr = "image_reference_origin"
    sample_create_data = {
        "entity_name": "Pet",
        "table_name": "pets",
        "field_name": "primary_image",
        "description": "Main image reference for pet profiles",
        "relation_type": "one_to_one",
        "is_active": True,
    }
    unique_field = ImageReferenceOrigin.ENTITY_NAME
    unique_field_value = "Pet"
    update_field = "is_active"
    updated_value = False
