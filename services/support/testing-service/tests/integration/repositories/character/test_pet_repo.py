import logging
import pytest
from datetime import datetime, UTC
from monstrino_models.dto import Pet
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_character_list")
class TestPetRepo(BaseCrudRepoTest):
    entity_cls = Pet
    repo_attr = "pet"
    sample_create_data = {
        "slug": "neptuna",
        "title": "Neptuna",
        "code": "neptuna",
        "description": "Lagoona Blue's loyal pet piranha living in her fishbowl purse.",
        "primary_image": "https://example.com/images/neptuna.jpg",
        "updated_at": datetime.now(UTC),
        "created_at": datetime.now(UTC),
    }
    unique_field = Pet.SLUG
    unique_field_value = "neptuna"
    update_field = "title"
    updated_value = "Neptuna the Piranha"
