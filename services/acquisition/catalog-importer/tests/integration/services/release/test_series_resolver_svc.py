import pytest
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.value_objects import SeriesRelationTypes
from monstrino_core.domain.errors import SeriesDataInvalidError
from monstrino_models.dto import ReleaseSeriesLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.ports import Repositories
from application.services.releases import SeriesResolverService


series = "Skullector"

series_parent = "Great Scarrier Reef"

series_child = "Down Under Ghouls"

def series_list_data_single() -> list:
    return [
        series
    ]

def series_list_data_parent() -> list:
    return [
        series_parent
    ]

def series_list_data_child() -> list:
    return [
        series_child
    ]

def series_list_data_parent_and_child() -> list:
    return [
        series_parent,
        series_child
    ]


@pytest.mark.asyncio
async def test_series_resolver_svc_single_series(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_series,
        seed_release_list
):
    """
    Test process single series
    """
    service = SeriesResolverService()
    release_series = series_list_data_single()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            series_list=release_series
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()
        assert len(links) == 1



@pytest.mark.asyncio
async def test_series_resolver_svc_parent_and_child_series(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_series_parent_and_child,
        seed_release_list
):
    """
    Test process parend and child series
    """
    service = SeriesResolverService()
    release_series = series_list_data_parent_and_child()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            series_list=release_series
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()
        assert len(links) == len(release_series)

@pytest.mark.asyncio
async def test_series_resolver_svc_only_child_series(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_series_parent_and_child,
        seed_release_list
):
    """
    Test process parend and child series
    """
    service = SeriesResolverService()
    release_series = series_list_data_child()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            series_list=release_series
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()
        assert len(links) == 2
        links.sort(key=lambda link: link.id)
        assert links[0].relation_type == SeriesRelationTypes.PRIMARY
        assert links[1].relation_type == SeriesRelationTypes.SECONDARY


@pytest.mark.asyncio
async def test_series_resolver_svc_duplicate_series_in_list(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_series,
        seed_release_list
):
    """
    Test that processing the same series name twice only creates one link (duplicate prevention).
    """
    service = SeriesResolverService()
    # Одна и та же серия дважды в списке
    release_series = [
        series,  # 'Skullector'
        series  # 'Skullector'
    ]

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            series_list=release_series
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()
        # Ожидается только 1 связь, т.к. вторая является дубликатом
        assert len(links) == 1


@pytest.mark.asyncio
async def test_series_resolver_svc_child_then_parent_series(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_series_parent_and_child,
        seed_release_list
):
    """
    Test processing child (SECONDARY) first, then parent (PRIMARY).
    Ensures that the PRIMARY link created by the child is not duplicated by the parent.
    """
    service = SeriesResolverService()
    # Обратный порядок: сначала дочерняя, потом родительская
    release_series = [
        series_child,  # 'Down Under Ghouls' (SECONDARY)
        series_parent  # 'Great Scarrier Reef' (PRIMARY)
    ]

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            series_list=release_series
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()

        # Ожидается всего 2 связи: 1 PRIMARY (для родителя) и 1 SECONDARY (для дочерней)
        assert len(links) == 2

        # Дополнительная проверка типов, чтобы подтвердить корректность логики
        primary_links = [link for link in links if link.relation_type == SeriesRelationTypes.PRIMARY]
        secondary_links = [link for link in links if link.relation_type == SeriesRelationTypes.SECONDARY]

        assert len(primary_links) == 1
        assert len(secondary_links) == 1


# @pytest.mark.asyncio
# async def test_series_resolver_svc_invalid_input_data(
#         uow_factory: UnitOfWorkFactory[Repositories],
#         seed_release_list
# ):
#     """
#     Test that SeriesDataInvalidError is raised when required 'text' field is missing.
#     """
#     service = SeriesResolverService()
#     # Элемент без ключа 'text'
#     release_series = [
#         {"link": "https://invalid.com", "other_field": 123},
#     ]
#
#     async with uow_factory.create() as uow:
#         with pytest.raises(SeriesDataInvalidError):
#             await service.resolve(
#                 uow=uow,
#                 release_id=1,
#                 series_list=release_series
#             )
#
#     # Дополнительная проверка: убедимся, что связи не были созданы
#     async with uow_factory.create() as uow:
#         links: list[ReleaseSeriesLink] = await uow.repos.release_series_link.get_all()
#         assert len(links) == 0