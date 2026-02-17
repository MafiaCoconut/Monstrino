import logging
import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedCharacter
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.ingest.ids import SOURCE_FANDOM_ID, fixture_uuid

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_character_list")
class TestParsedCharacterRepo(BaseCrudRepoTest):
    entity_cls = ParsedCharacter
    repo_attr = "parsed_character"
    sample_create_data = {
        "id": fixture_uuid("test.ingest.parsed_character.clawdeen"),
        "title": "Clawdeen Wolf",
        "gender": "female",
        "description": "Werewolf fashionista from Monster High.",
        "primary_image": "https://example.com/images/clawdeen.jpg",
        "url": "https://monsterhigh.fandom.com/wiki/Clawdeen_Wolf",
        "processing_state": ProcessingStates.INIT,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "fandom:clawdeen-wolf",
        "original_html_content": "<html><body>Clawdeen details...</body></html>",
    }
    unique_field = ParsedCharacter.TITLE
    unique_field_value = "Clawdeen Wolf"
    update_field = ParsedCharacter.PROCESSING_STATE
    updated_value = ProcessingStates.INIT
