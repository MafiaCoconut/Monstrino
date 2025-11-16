import logging
import pytest
from monstrino_core import ProcessingStates
from monstrino_models.dto import ParsedPet
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_pet_db")
class TestParsedPetRepo(BaseCrudRepoTest):
    entity_cls = ParsedPet
    repo_attr = "parsed_pet"
    sample_create_data = {
        "name": "Neptuna",
        "description": "Lagoona Blue’s pet piranha living in her handbag aquarium.",
        "owner_name": "Lagoona Blue",
        "primary_image": "https://example.com/images/neptuna.jpg",
        "link": "https://monsterhigh.fandom.com/wiki/Neptuna",
        "processing_state": ProcessingStates.INIT,
        "source": "monsterhigh_fandom",
        "original_html_content": "<html><body>Neptuna details...</body></html>",
    }
    unique_field = ParsedPet.NAME
    unique_field_value = "Neptuna"
    update_field = "processing_state"
    updated_value = ProcessingStates.INIT
