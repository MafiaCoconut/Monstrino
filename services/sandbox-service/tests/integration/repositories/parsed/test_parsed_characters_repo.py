import logging
import pytest
from monstrino_models.dto import ParsedCharacter
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_characters_db")
class TestParsedCharactersRepo(BaseCrudRepoTest):
    entity_cls = ParsedCharacter
    repo_attr = "parsed_characters"
    sample_create_data = {
        "name": "Clawdeen Wolf",
        "gender": "female",
        "description": "Werewolf fashionista from Monster High.",
        "primary_image": "https://example.com/images/clawdeen.jpg",
        "link": "https://monsterhigh.fandom.com/wiki/Clawdeen_Wolf",
        "process_state": "parsed",
        "source": "monsterhigh_fandom",
        "original_html_content": "<html><body>Clawdeen details...</body></html>",
    }
    unique_field = ParsedCharacter.NAME
    unique_field_value = "Clawdeen Wolf"
    update_field = "process_state"
    updated_value = "validated"
