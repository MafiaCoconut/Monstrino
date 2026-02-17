import logging

import pytest
from monstrino_core.domain.value_objects.character.character_gender import CharacterGender
from monstrino_models.dto import Character

from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


class TestCharacterRepo(BaseCrudRepoTest):
    entity_cls = Character
    repo_attr = "character"
    sample_create_data = {
        "slug": "clawdeen-wolf",
        "title": "Clawdeen Wolf",
        "code": "clawdeen-wolf",
        "gender": CharacterGender.GHOUL,
        "description": "Werewolf fashionista with fierce confidence.",
        "primary_image": "https://example.com/images/clawdeen.jpg",
        "alt_names": ["Clawdeen"],
        "notes": "One of the original Monster High students.",
    }
    unique_field = Character.SLUG
    unique_field_value = "clawdeen-wolf"
    update_field = "title"
    updated_value = "Clawdeen W."
