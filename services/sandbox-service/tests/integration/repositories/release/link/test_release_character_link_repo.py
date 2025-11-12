import logging
import pytest
from monstrino_models.dto import ReleaseCharacterLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_character_link_db")
class TestReleaseCharacterLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseCharacterLink
    repo_attr = "release_character_link"
    sample_create_data = {
        "release_id": 1,
        "character_id": 2,
        "role_id": 2,
        "position": 1,
    }
    unique_field = ReleaseCharacterLink.ID
    unique_field_value = 1
    update_field = "position"
    updated_value = 2
