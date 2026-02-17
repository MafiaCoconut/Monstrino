import logging
import pytest
from monstrino_models.dto import ReleaseExternalReference
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    RELEASE_SKULLECTOR_ALIEN_ID,
    SOURCE_FANDOM_ID,
    fixture_uuid,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_source_list", "seed_release_list")
class TestReleaseExternalReferenceRepo(BaseCrudRepoTest):
    entity_cls = ReleaseExternalReference
    repo_attr = "release_external_reference"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_external_reference.skullector.fandom"),
        "release_id": RELEASE_SKULLECTOR_ALIEN_ID,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "https://example.com/release/clawdeen-werewolf-wonders",
    }
    unique_field = ReleaseExternalReference.ID
    unique_field_value = fixture_uuid("test.catalog.release_external_reference.skullector.fandom")
    update_field = ReleaseExternalReference.EXTERNAL_ID
    updated_value = "https://example.com/test/release/clawdeen-werewolf-wonders"
