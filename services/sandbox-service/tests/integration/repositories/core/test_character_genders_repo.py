import logging

from monstrino_models.dto import CharacterGender
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


class TestCharacterGendersRepo(BaseCrudRepoTest):
    entity_cls = CharacterGender
    repo_attr = "character_genders"
    sample_create_data = {
        "name": "MALE",
        "display_name": "Male",
        "plural_name": "Males",
    }
    unique_field = CharacterGender.NAME
    unique_field_value = "MALE"
    update_field = "display_name"
    updated_value = "Manster"

# @pytest.mark.asyncio
# async def test_save_character_gender(
#         character_gender: CharacterGender,
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     async with uow:
#         await uow.repos.character_genders.save(character_gender)
#
#         fetched_character_gender = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, character_gender.name)
#     async with uow:
#         refetched = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, character_gender.name)
#
#     assert fetched_character_gender is not None
#     assert isinstance(fetched_character_gender, CharacterGender)
#     assert fetched_character_gender.name == character_gender.name
#     assert fetched_character_gender.display_name == character_gender.display_name
#     assert fetched_character_gender.plural_name == character_gender.plural_name
#     assert refetched.name == character_gender.name
#
#
# @pytest.mark.asyncio
# async def test_save_character_gender_updates_existing(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     async with uow:
#         gender = CharacterGender(name="ghoul", display_name="Ghoul", plural_name="Ghouls")
#         await uow.repos.character_genders.save(gender)
#
#         # update display_name
#         gender.display_name = "Manster"
#         await uow.repos.character_genders.update(filters={'name': gender.name}, values={'display_name': gender.display_name})
#
#     async with uow:
#         fetched = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, "ghoul")
#
#     assert fetched.display_name == "Manster"
#
# @pytest.mark.asyncio
# async def test_save_raises_if_unique_conflict(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     async with uow:
#         gender1 = CharacterGender(name="MALE", display_name="Male", plural_name="Males")
#         await uow.repos.character_genders.save(gender1)
#
#         fetched_gender1 = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, "MALE")
#         logger.info(f"Fetched gender1: {fetched_gender1}")
#
#         gender2 = CharacterGender(name="MALE", display_name="Duplicate", plural_name="Duplicated")
#
#         with pytest.raises(EntityAlreadyExists) as exc_info:
#             async with uow.savepoint():
#                     await uow.repos.character_genders.save(gender2)
#
#     expected_message = ErrorTemplates.ENTITY_ALREADY_EXISTS.format(
#         entity="CharacterGender", value=gender2
#     )
#     assert str(exc_info.value) == expected_message
#
# @pytest.mark.asyncio
# async def test_get_by_name_or_none_returns_none_if_not_found(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     async with uow:
#         result = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, "NON_EXISTENT")
#     assert result is None
#
#
# @pytest.mark.asyncio
# async def test_get_by_name_or_raise_raises_entity_not_found(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories],
#         seed_character_genders_db,
# ):
#     async with uow:
#         search_name = "MAN"
#
#         with pytest.raises(EntityNotFound) as exc_info:
#             await uow.repos.character_genders.get_by_field_or_raise(CharacterGender.NAME, search_name)
#
#         expected_message = ErrorTemplates.ENTITY_NOT_FOUND.format(
#             entity="CharacterGender", field="name", value=search_name
#         )
#         assert str(exc_info.value) == expected_message
#
# @pytest.mark.asyncio
# async def test_get_all_returns_list(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories],
#         seed_character_genders_db,
# ):
#     async with uow:
#         result = await uow.repos.character_genders.get_all()
#     assert isinstance(result, list)
#     assert all(isinstance(g, CharacterGender) for g in result)
#
# @pytest.mark.asyncio
# async def test_exists_by_returns_true_and_false(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     async with uow:
#         gender = CharacterGender(name="TEST", display_name="T", plural_name="Ts")
#         await uow.repos.character_genders.save(gender)
#         assert await uow.repos.character_genders.exists_by_name("TEST") is True
#         assert await uow.repos.character_genders.exists_by_name("UNKNOWN") is False
#
#
#
# @pytest.mark.asyncio
# async def test_delete_removes_entity(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     async with uow:
#         gender = CharacterGender(name="TEMP", display_name="Temp", plural_name="Temps")
#         await uow.repos.character_genders.save(gender)
#         await uow.repos.character_genders.delete_by_name(gender.name)
#         await uow.commit()
#
#     async with uow:
#         result = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, "TEMP")
#     assert result is None
#
# @pytest.mark.asyncio
# async def test_commit_persists_changes(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     gender = CharacterGender(name="ROLL", display_name="Roll", plural_name="Rolls")
#
#     async with uow:
#         await uow.repos.character_genders.save(gender)
#         await uow.commit()
#
#     async with uow:
#         fetched = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, "ROLL")
#     assert fetched is not None
#
#
# @pytest.mark.asyncio
# async def test_rollback_discards_changes(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories]
# ):
#     gender = CharacterGender(name="TEMP2", display_name="T2", plural_name="T2s")
#
#     try:
#         async with uow:
#             await uow.repos.character_genders.save(gender)
#             raise RuntimeError("Force rollback")
#     except RuntimeError:
#         pass
#
#     async with uow:
#         result = await uow.repos.character_genders.get_by_field_or_none(CharacterGender.NAME, "TEMP2")
#     assert result is None
#
#
# @pytest.mark.asyncio
# async def test_count_returns_expected_value(
#         uow: UnitOfWorkInterface[AsyncSession, Repositories],
#         seed_character_genders_db,
# ):
#     async with uow:
#         count = await uow.repos.character_genders.count_all()
#     assert isinstance(count, int)
#     assert count >= 1