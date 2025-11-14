import logging

import pytest
from monstrino_models.dto import Character

from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_gender_db")
class TestCharacterRepo(BaseCrudRepoTest):
    entity_cls = Character
    repo_attr = "character"
    sample_create_data = {
        "name": "Clawdeen Wolf",
        "display_name": "Clawdeen Wolf",
        "gender_id": 1,
        "description": "Werewolf fashionista with fierce confidence.",
        "primary_image": "https://example.com/images/clawdeen.jpg",
        "alt_names": "Clawdeen",
        "notes": "One of the original Monster High students.",
    }
    unique_field = Character.NAME
    unique_field_value = "Clawdeen Wolf"
    update_field = "display_name"
    updated_value = "Clawdeen W."
