import logging
import pytest
from monstrino_models.dto import ReleaseType
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_type_db")
class TestReleaseTypeRepo(BaseCrudRepoTest):
    entity_cls = ReleaseType
    repo_attr = "release_type"
    sample_create_data = {
        "name": "accessory_pack",
        "display_name": "Accessory Pack",
    }
    unique_field = ReleaseType.NAME
    unique_field_value = "accessory_pack"
    update_field = "display_name"
    updated_value = "Accessory Bundle"
