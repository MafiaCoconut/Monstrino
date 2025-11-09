import logging
import pytest
from monstrino_models.dto import Release
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_releases_db")
class TestReleasesRepo(BaseCrudRepoTest):
    entity_cls = Release
    repo_attr = "releases"
    sample_create_data = {
        "name": "Clawdeen Wolf Music Festival",
        "display_name": "Clawdeen Wolf - Music Festival",
        "mpn": "MH34567",
        "type_ids": [1],
        "exclusive_ids": [3],
        "year": 2013,
        "description": "Festival-themed Clawdeen Wolf with purple outfit and guitar.",
        "from_the_box": "Rock your freaky style!",
        "link": "https://monsterhigh.fandom.com/wiki/Clawdeen_Wolf_(Music_Festival)",
    }
    unique_field = Release.NAME
    unique_field_value = "Clawdeen Wolf Music Festival"
    update_field = "display_name"
    updated_value = "Clawdeen Wolf - Music Fest Edition"
