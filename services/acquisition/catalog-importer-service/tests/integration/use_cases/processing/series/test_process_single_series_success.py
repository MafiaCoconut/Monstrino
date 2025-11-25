from typing import Optional

import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_core.domain.value_objects import SeriesTypes
from monstrino_models.dto import ParsedSeries
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories
from sqlalchemy.ext.asyncio import AsyncSession

from application.use_cases.processing.series import ProcessSeriesSingleUseCase


@pytest.mark.asyncio
async def test_process_single_series_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        parsed_series: ParsedSeries,
        parent_resolver_svc_mock,
        processing_states_svc_mock,
        image_reference_svc_mock,
):
    async with uow_factory.create() as uow:
        async with uow:
            parsed_series = await uow.repos.parsed_series.save(parsed_series)


        parent_resolver_svc_mock.resolve.return_value = None

    uc = ProcessSeriesSingleUseCase(
        uow_factory=uow_factory,
        parent_resolver_svc=parent_resolver_svc_mock,
        processing_states_svc=processing_states_svc_mock,
        image_reference_svc=image_reference_svc_mock
    )

    await uc.execute(parsed_series_id=parsed_series.id)

    async with uow_factory.create() as uow:
        series = await uow.repos.series.get_one_by(display_name=parsed_series.name)
        assert series is not None
        assert series.display_name == parsed_series.name
        assert series.series_type == parsed_series.series_type
        assert series.primary_image == parsed_series.primary_image

        if parsed_series.series_type == SeriesTypes.SECONDARY:
            assert series.parent_id is not None

        parsed_series_after: ParsedSeries = await uow.repos.parsed_series.get_one_by(name=parsed_series.name, processing_state=ProcessingStates.PROCESSED)
        assert parsed_series_after is not None
        assert parsed_series_after.processing_state == ProcessingStates.PROCESSED
