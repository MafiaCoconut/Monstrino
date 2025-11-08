import logging

import pytest
from monstrino_core import UnitOfWorkInterface
from monstrino_models.dto import Character

logger = logging.getLogger(__name__)


@pytest.mark.asyncio
async def test_save_unprocessed_character_and_get(character: Character, uow: UnitOfWorkInterface, seed_character_genders_db):
    async with uow:
        await uow.repos.characters.save(character)

        fetched_character = await uow.repos.characters.get_by_name(character.name)
    logger.info(fetched_character)
    assert isinstance(fetched_character, Character)
    assert fetched_character.name == character.name
    assert fetched_character.display_name == character.display_name
    assert fetched_character.description == character.description
    assert fetched_character.gender_id == character.gender_id
    assert fetched_character.primary_image == character.primary_image
    assert fetched_character.alt_names == character.alt_names
    assert fetched_character.notes == character.notes


# @pytest.mark.asyncio
# async def test_get_not_exists_character_name(uow: UnitOfWorkInterface):