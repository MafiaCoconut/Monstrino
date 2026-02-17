import pytest

from integration.common import BaseCrudRepoTest
from monstrino_models.dto import CharacterExternalReference
from monstrino_testing.fixtures.data.catalog.ids import (
    CHARACTER_DRACULAURA_ID,
    SOURCE_FANDOM_ID,
    fixture_uuid,
)


@pytest.mark.usefixtures("seed_character_list", "seed_source_list","seed_character_external_reference_list")
class TestCharacterExternalReferenceRepo(BaseCrudRepoTest):
    entity_cls = CharacterExternalReference
    repo_attr = "character_external_reference"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.character_external_reference.draculaura.fandom"),
        "character_id": CHARACTER_DRACULAURA_ID,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "fandom:draculaura",
    }

    unique_field = CharacterExternalReference.ID
    unique_field_value = fixture_uuid("test.catalog.character_external_reference.draculaura.fandom")
    update_field = CharacterExternalReference.EXTERNAL_ID
    updated_value = "fandom:draculaura-updated"
