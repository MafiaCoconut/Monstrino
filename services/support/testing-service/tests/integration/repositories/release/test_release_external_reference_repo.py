import logging
import pytest
from monstrino_models.dto import RelationType, ReleaseExternalReference
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_source_list", "seed_release_list")
class TestReleaseExternalReferenceRepo(BaseCrudRepoTest):
    entity_cls = ReleaseExternalReference
    repo_attr = "release_external_reference"
    sample_create_data = {
        "release_id": 3,
        "source_id": 2,
        "url": "https://example.com/release/clawdeen-werewolf-wonders",
    }
    unique_field = ReleaseExternalReference.RELEASE_ID
    unique_field_value = 3
    update_field = "url"
    updated_value = "https://example.com/test/release/clawdeen-werewolf-wonders"
