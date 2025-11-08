import pytest
import logging
from monstrino_core import UnitOfWorkInterface
from monstrino_models.dto import CharacterGender
from monstrino_models.exceptions import EntityNotFound, ErrorTemplates

logger = logging.getLogger(__name__)

@pytest.mark.asyncio
async def test_save_character_gender(character_gender: CharacterGender, uow: UnitOfWorkInterface):
    async with uow:
        await uow.repos.character_genders.save(character_gender)

        fetched_character_gender = await uow.repos.character_genders.get_by_name_or_none(character_gender.name)
    async with uow:
        fetched_character_gender1 = await uow.repos.character_genders.get_by_name_or_none(character_gender.name)

    logger.info('fsda')
    logger.info(fetched_character_gender1)
    assert fetched_character_gender is not None
    assert isinstance(fetched_character_gender, CharacterGender)
    assert fetched_character_gender.name == character_gender.name
    assert fetched_character_gender.display_name == character_gender.display_name
    assert fetched_character_gender.plural_name == character_gender.plural_name

@pytest.mark.asyncio
async def test_character_gender_get_not_exists_name(uow: UnitOfWorkInterface, seed_character_genders_db, ):
    async with uow:

        search_name = "MAN"

        with pytest.raises(EntityNotFound) as exc_info:
            await uow.repos.character_genders.get_by_name_or_raise(search_name)

        expected_message = ErrorTemplates.ENTITY_NOT_FOUND.format(
            entity="CharacterGender", field="name", value=search_name
        )

        assert str(exc_info.value) == expected_message

