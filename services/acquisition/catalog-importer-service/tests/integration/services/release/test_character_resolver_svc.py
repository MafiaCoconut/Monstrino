import pytest
from monstrino_core import CharacterRoleEnum
from monstrino_models.dto import ReleaseCharacterLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import CharacterResolverService


def сharacters_data() -> list:
    return [
        {
            "link": "https://monster_high/frankie-stein",
            "text": "Frankie Stein"
        },
        {
            "link": "https://monster_high/draculaura",
            "text": "Draculaura"
        }
    ]

@pytest.mark.asyncio
async def test_character_resolver_svc(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_list,
        seed_character_role_list,
        seed_release_list
):

    service = CharacterResolverService()
    release_characters = сharacters_data()
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

        assert links[0].role_id == await uow.repos.character_role.get_id_by(name=CharacterRoleEnum.MAIN)
        assert links[1].role_id == await uow.repos.character_role.get_id_by(name=CharacterRoleEnum.SECONDARY)