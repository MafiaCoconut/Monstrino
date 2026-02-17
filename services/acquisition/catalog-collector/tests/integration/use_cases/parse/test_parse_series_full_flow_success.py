import pytest
from monstrino_core.domain.value_objects import SeriesTypes
from monstrino_models.dto import ParsedSeries
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports.repositories import Repositories
from app.registries.ports_registry import PortsRegistry
from app.use_cases.parse.parse_series_use_case import ParseSeriesUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey


@pytest.mark.asyncio
async def test_parse_pet_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list
):
    uc = ParseSeriesUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    scope = ParseScope()
    limit = 6
    await uc.execute(SourceKey.MHArchive, scope=scope, batch_size=10, limit=6)

    async with uow_factory.create() as uow:
        series = await uow.repos.parsed_series.get_many_by(**{ParsedSeries.SERIES_TYPE: SeriesTypes.PRIMARY})
        assert len(series) == limit