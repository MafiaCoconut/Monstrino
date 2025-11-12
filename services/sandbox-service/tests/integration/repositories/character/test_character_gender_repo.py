import logging

from monstrino_models.dto import CharacterGender
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


class TestCharacterGenderRepo(BaseCrudRepoTest):
    entity_cls = CharacterGender
    repo_attr = "character_gender"
    sample_create_data = {
        "name": "MALE",
        "display_name": "Male",
        "plural_name": "Males",
    }
    unique_field = CharacterGender.NAME
    unique_field_value = "MALE"
    update_field = "display_name"
    updated_value = "Manster"
