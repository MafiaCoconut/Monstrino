import pytest
from monstrino_core import CharacterRoleEnum, NameFormatter
from monstrino_models.dto import ReleaseCharacterLink, ReleaseExclusiveLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import CharacterResolverService, ExclusiveResolverService


def exclusive_list_data() -> list:
    return [
        {
            "link": "https://mattel-creation",
            "text": "Mattel Creations"
        },
        {
            "link": "https://target.com",
            "text": "Target"
        }
    ]


@pytest.mark.asyncio
async def test_exclusive_resolver_svc(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_exclusive_vendor_list,
        seed_release_list
):

    service = ExclusiveResolverService()
    release_exclusives = exclusive_list_data()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            exclusive_list=release_exclusives
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseExclusiveLink] = await uow.repos.release_exclusive_link.get_()
        assert len(links) == len(release_exclusives)

        assert links[0].vendor_id == await uow.repos.exclusive_vendor.get_id_by(name=NameFormatter.format_name(release_exclusives[0]['text']))
        assert links[1].vendor_id == await uow.repos.exclusive_vendor.get_id_by(name=NameFormatter.format_name(release_exclusives[1]['text']))