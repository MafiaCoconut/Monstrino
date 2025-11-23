import pytest
from monstrino_core import NameFormatter
from monstrino_models.dto import ReleaseTypeLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import TypeResolverService


def type_single() -> dict:
    return {
        "link": "https://Playset",
        "text": "Playset"
    }

def type_content_list() -> list:
    return [type_single()]

def type_product_1() -> dict:
    return {
        "link": "https://funko-pop",
        "text": "Funko Pop"
    }

def type_product_2() -> dict:
    return {
        "link": "https://minis",
        "text": "Minis"
    }






@pytest.mark.asyncio
async def test_type_resolver_svc_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_product_line_list,
        seed_release_type_list,
        seed_release_list
):

    service = TypeResolverService()
    release_type = type_single()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            type_list=[release_type],
            multi_pack_list=[]
        )

    async with uow_factory.create() as uow:
        links = await uow.repos.release_type_link.get_all()
        assert len(links) == 1

        assert links[0].type_id == await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(release_type.get('text')))


