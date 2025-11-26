import pytest
from monstrino_core.domain.services import NameFormatter
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.series.parent_resolver_svc import ParentResolverService
from application.use_cases.processing.series import ProcessSeriesSingleUseCase
from application.use_cases.processing.series.process_series_batch_use_case import ProcessSeriesBatchUseCase


@pytest.mark.asyncio
async def test_process_series_batch_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_series_parent_and_child,
        processing_states_svc_mock,
        image_reference_svc_mock,
):
    # --- ARRANGE ---
    parent_parsed, child_parsed = seed_parsed_series_parent_and_child
    single_uc = ProcessSeriesSingleUseCase(
        uow_factory=uow_factory,
        parent_resolver_svc=ParentResolverService(),
        processing_states_svc=processing_states_svc_mock,
        image_reference_svc=image_reference_svc_mock
    )
    batch_uc = ProcessSeriesBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=10,
    )

    # --- ACT ---
    await batch_uc.execute()

    # --- ASSERT ---
    async with uow_factory.create() as uow:
        # 1. Родитель должен сохраниться в series
        parent_series = await uow.repos.series.get_one_by(
            name=NameFormatter.format_name(parent_parsed.name)
        )
        assert parent_series is not None
        assert parent_series.display_name == parent_parsed.name

        # 2. Ребёнок должен сохраниться в series
        child_series = await uow.repos.series.get_one_by(
            name=NameFormatter.format_name(child_parsed.name)
        )
        assert child_series is not None
        assert child_series.display_name == child_parsed.name

        # 3. Связь parent_id ребёнка на серию-родителя
        assert child_series.parent_id == parent_series.id

        # 4. Оба parsed_series помечены как PROCESSED
        parsed_parent_after = await uow.repos.parsed_series.get_one_by(
            id=parent_parsed.id
        )
        parsed_child_after = await uow.repos.parsed_series.get_one_by(
            id=child_parsed.id
        )

        assert parsed_parent_after.processing_state == ProcessingStates.PROCESSED
        assert parsed_child_after.processing_state == ProcessingStates.PROCESSED