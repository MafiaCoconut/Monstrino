import pytest
from monstrino_models.dto import ParsedSeries, Series
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports import Repositories
from app.services.series.parent_resolver_svc import ParentResolverService


@pytest.mark.asyncio
async def test_parent_resolver_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_series_parent_and_child,
        seed_series_parent,

):

    # создаём пустую доменную сущность для заполнения

    parent_parsed, child_parsed = seed_parsed_series_parent_and_child
    parent_series = seed_series_parent
    child_series = Series(
        name=child_parsed.name,
        display_name=child_parsed.name,
        series_type=child_parsed.series_type,
        description=child_parsed.description,
        primary_image=child_parsed.primary_image
    )

    assert parent_parsed.name == parent_series.display_name
    service = ParentResolverService()

    # --- ACT ---
    async with uow_factory.create() as uow:
        await service.resolve(uow, child_parsed, child_series)

    # --- ASSERT ---
    assert child_series.parent_id == parent_series.id
