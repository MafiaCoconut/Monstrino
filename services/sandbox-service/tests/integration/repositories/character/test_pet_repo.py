import logging
import pytest
from monstrino_models.dto import Pet
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_db")
class TestPetRepo(BaseCrudRepoTest):
    entity_cls = Pet
    repo_attr = "pet"
    sample_create_data = {
        "name": "Neptuna",
        "display_name": "Neptuna",
        "description": "Lagoona Blue’s loyal pet piranha living in her fishbowl purse.",
        "owner_id": 1,
        "primary_image": "https://example.com/images/neptuna.jpg",
    }
    unique_field = Pet.NAME
    unique_field_value = "Neptuna"
    update_field = "display_name"
    updated_value = "Neptuna the Piranha"
