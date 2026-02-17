import logging
import pytest
from monstrino_models.dto import Release
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_list")
class TestReleaseRepo(BaseCrudRepoTest):
    entity_cls = Release
    repo_attr = "release"
    sample_create_data = {
        "slug": "clawdeen-wolf-music-festival",
        "title": "Clawdeen Wolf - Music Festival",
        "code": "clawdeen-wolf-music-festival",
        "name": "clawdeen-wolf-music-festival",
        "display_name": "Clawdeen Wolf - Music Festival",
        "mpn": "MH34567",
        "year": 2013,
        "description": "Festival-themed Clawdeen Wolf with purple outfit and guitar.",
        "text_from_box": "Rock your freaky style!",
    }
    unique_field = Release.SLUG
    unique_field_value = "clawdeen-wolf-music-festival"
    update_field = "title"
    updated_value = "Clawdeen Wolf - Music Fest Edition"
