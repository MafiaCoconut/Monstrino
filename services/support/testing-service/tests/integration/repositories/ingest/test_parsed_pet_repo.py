import logging
import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedPet
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.ingest.ids import SOURCE_FANDOM_ID, fixture_uuid

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_pet_list")
class TestParsedPetRepo(BaseCrudRepoTest):
    entity_cls = ParsedPet
    repo_attr = "parsed_pet"
    sample_create_data = {
        "id": fixture_uuid("test.ingest.parsed_pet.neptuna"),
        "title": "Neptuna",
        "description": "Lagoona Blue’s pet piranha living in her handbag aquarium.",
        "owner_name": "Lagoona Blue",
        "primary_image": "https://example.com/images/neptuna.jpg",
        "url": "https://monsterhigh.fandom.com/wiki/Neptuna",
        "processing_state": ProcessingStates.INIT,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "fandom:neptuna",
        "original_html_content": "<html><body>Neptuna details...</body></html>",
    }
    unique_field = ParsedPet.TITLE
    unique_field_value = "Neptuna"
    update_field = ParsedPet.PROCESSING_STATE
    updated_value = ProcessingStates.INIT
