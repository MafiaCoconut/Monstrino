import pytest
from monstrino_core import NameFormatter
from monstrino_models.dto import ReleaseSeriesLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import SeriesResolverService

def series_list_data() -> list:
    return [
        {
            "link": "https://just_url.com",
            "text": "Skullector"
        }
    ]

def series_list_data_parent_and_child() -> list:
    return [
        {
            "link": "https://mattel-creation",
            "text": "Ghouls Rule"
        },
        {
            "link": "https://target.com",
            "text": "Ghouls Rule Accessories"
        }
    ]


@pytest.mark.asyncio
async def test_series_resolver_svc(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_series_list,
        seed_release_list
):

    service = SeriesResolverService()
    release_series = series_list_data()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            series_list=release_series
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()
        assert len(links) == len(release_series)



