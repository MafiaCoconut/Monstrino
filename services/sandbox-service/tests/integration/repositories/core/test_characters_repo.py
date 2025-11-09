import logging

import pytest
from monstrino_core import UnitOfWorkInterface
from monstrino_models.dto import Character
from monstrino_core.exceptions import EntityNotFound, ErrorTemplates
from monstrino_models.orm import CharactersORM
from sqlalchemy.ext.asyncio import AsyncSession

from fixtures.db.repositories_fixture import Repositories
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)

@pytest.mark.usefixtures("seed_character_genders_db")
class TestCharactersRepo(BaseCrudRepoTest):
    entity_cls = Character
    repo_attr = "characters"
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

    # async def pre_setup(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request: pytest.FixtureRequest):
    #     data_factory = TestDataFactory(request)
    #     data_factory.character_genders()