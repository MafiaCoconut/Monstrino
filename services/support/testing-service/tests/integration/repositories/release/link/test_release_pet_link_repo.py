import logging
import pytest
from monstrino_models.dto import ReleasePetLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_pet_link_list")
class TestReleasePetLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleasePetLink
    repo_attr = "release_pet_link"
    sample_create_data = {
        "release_id": 1,
        "pet_id": 2,
        "position": 1,
    }
    unique_field = ReleasePetLink.ID
    unique_field_value = 1
    update_field = "position"
    updated_value = 2
