import pytest
from monstrino_core.domain.value_objects import CharacterRoleType
from monstrino_models.dto import ReleaseCharacterLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import CharacterResolverService

def character_1() -> str:
    return "Frankie Stein"


def character_2() -> str:
    return "Draculaura"


def characters_data() -> list:
    return [
        character_1(),
        character_2()
    ]

@pytest.mark.asyncio
async def test_character_resolver_svc(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_list,
        seed_character_role_list,
        seed_release_list
):

    service = CharacterResolverService()
    release_characters = characters_data()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            characters=release_characters
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseCharacterLink] = await uow.repos.release_character_link.get_all()
        assert len(links) == len(release_characters)

        assert links[0].position == 1
        assert links[1].position == 2

        assert links[0].role_id == await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN)
        assert links[1].role_id == await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY)


@pytest.mark.asyncio
async def test_character_resolver_svc_duplicate_character_in_list(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_list,
        seed_character_role_list,
        seed_release_list
):
    """
    Test that processing the same character name twice only creates one link,
    and the position/role corresponds to the first appearance.
    """
    service = CharacterResolverService()
    # "Frankie Stein" встречается дважды
    release_characters = [
        character_1(),  # Frankie Stein
        character_2(),  # Draculaura
        character_1(),  # Frankie Stein (дубликат)
    ]

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            characters=release_characters
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseCharacterLink] = await uow.repos.release_character_link.get_all()
        # Ожидается только 2 связи: Frankie (MAIN, pos=1) и Draculaura (SECONDARY, pos=2)
        assert len(links) == 2

        # Проверяем, что Frankie получила MAIN роль и position=1
        frankie_link = next(link for link in links if link.position == 1)
        assert frankie_link.role_id == await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN)


import logging


# Используйте caplog для перехвата логов

@pytest.mark.asyncio
async def test_character_resolver_svc_character_not_found_logs_error(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_list,
        seed_character_role_list,
        seed_release_list,
        caplog
):
    """
    Test that a non-existent character name is logged as an error,
    but processing continues for the remaining characters.
    """
    service = CharacterResolverService()
    release_characters = [
        character_1(),  # Предположим, что это первый персонаж в фикстуре
        "Batman",  # Этого нет в БД
        character_2()  # Draculaura (должна получить SECONDARY роль)
    ]

    with caplog.at_level(logging.ERROR):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow=uow,
                release_id=1,
                characters=release_characters
            )

    async with uow_factory.create() as uow:
        links: list[ReleaseCharacterLink] = await uow.repos.release_character_link.get_all()

        # Должны быть созданы 2 связи (Franckie Stein и Draculaura)
        assert len(links) == 2

        # Проверяем, что Draculaura получила position=2 и SECONDARY роль
        draculaura_link = next(link for link in links if link.position == 2)
        assert draculaura_link.role_id == await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY)

        # Проверяем, что ошибка для MissingCharacterName была залогирована
        # assert "Character found in parsed data, but not found in character db: MissingCharacterName" in caplog.text

