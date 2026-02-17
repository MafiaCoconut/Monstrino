import logging
import pytest
from monstrino_core.domain.value_objects import ReleaseTypeCategory
from monstrino_models.dto import ReleaseType
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_type_list")
class TestReleaseTypeRepo(BaseCrudRepoTest):
    entity_cls = ReleaseType
    repo_attr = "release_type"
    sample_create_data = {
        "code": "accessory_pack",
        "title": "Accessory Pack",
        "category": ReleaseTypeCategory.CONTENT
    }
    unique_field = ReleaseType.CODE
    unique_field_value = "accessory_pack"
    update_field = ReleaseType.TITLE
    updated_value = "Accessory Bundle"
