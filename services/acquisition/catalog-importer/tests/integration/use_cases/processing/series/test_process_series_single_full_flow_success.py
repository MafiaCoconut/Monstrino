import pytest
from monstrino_core.domain.services import NameFormatter
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.enums import EntityName
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.container_components import Repositories
from application.services.common import SeriesProcessingStatesService, ImageReferenceService
from application.services.series.parent_resolver_svc import ParentResolverService
from application.use_cases.processing.series import ProcessSeriesSingleUseCase


@pytest.mark.asyncio
async def test_process_series_single_full_flow_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_image_reference_all,
        seed_parsed_series_parent_and_child,
        seed_series_parent,
        processing_states_svc_mock,
        image_reference_svc_mock,
):
    """
    Тест проверяет полный цикл обработки дочерней серии уже с существующим родителем в релизной таблице
    """

    # ---- ARRANGE ----
    # Данные из фикстур
    parent_parsed, child_parsed = seed_parsed_series_parent_and_child
    parent_series = seed_series_parent

    # Создаём UseCase
    uc = ProcessSeriesSingleUseCase(
        uow_factory=uow_factory,
        parent_resolver_svc=ParentResolverService(),
        processing_states_svc=SeriesProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
    )

    # ---- ACT ----
    await uc.execute(parsed_series_id=child_parsed.id)

    # ---- ASSERT ----
    async with uow_factory.create() as uow:
        # 1. Проверяем, что создан объект Series (child)
        series_child = await uow.repos.series.get_one_by(
            name=NameFormatter.format_name(child_parsed.name)
        )
        assert series_child is not None

        # 2. Проверяем корректное наполнение полей
        assert series_child.display_name == child_parsed.name
        assert series_child.series_type == child_parsed.series_type
        assert series_child.primary_image == child_parsed.primary_image

        # 3. Проверяем корректную привязку parent_id → должен ссылаться на series_parent
        assert series_child.parent_id == parent_series.id

        # 4. Проверяем, что parsed_series помечен как PROCESSED
        parsed_child_after = await uow.repos.parsed_series.get_one_by(
            id=child_parsed.id
        )
        assert parsed_child_after.processing_state == ProcessingStates.PROCESSED

        # 5 Проверяем что фото корректно установлено на обработку
        images = await uow.repos.image_import_queue.get_all()
        assert len(images) == 1

