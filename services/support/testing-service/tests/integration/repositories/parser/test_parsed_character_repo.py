import logging
import pytest
from monstrino_models.dto import ParsedCharacter
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_character_db")
class TestParsedCharacterRepo(BaseCrudRepoTest):
    entity_cls = ParsedCharacter
    repo_attr = "parsed_character"
    sample_create_data = {
        "name": "Clawdeen Wolf",
        "gender": "female",
        "description": "Werewolf fashionista from Monster High.",
        "primary_image": "https://example.com/images/clawdeen.jpg",
        "link": "https://monsterhigh.fandom.com/wiki/Clawdeen_Wolf",
        "processing_state": "parsed",
        "source": "monsterhigh_fandom",
        "original_html_content": "<html><body>Clawdeen details...</body></html>",
    }
    unique_field = ParsedCharacter.NAME
    unique_field_value = "Clawdeen Wolf"
    update_field = "processing_state"
    updated_value = "validated"
