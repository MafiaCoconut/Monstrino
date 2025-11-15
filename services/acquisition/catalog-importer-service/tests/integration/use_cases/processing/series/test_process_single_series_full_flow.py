import pytest
from monstrino_core import NameFormatter, ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.series.parent_resolver_svc import ParentResolverService
from application.use_cases.processing.series import ProcessSingleSeriesUseCase


@pytest.mark.asyncio
async def test_process_single_series_full_flow(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_series_parent_and_child,   # parsed-series
        seed_series_parent,                    # series parent
):
    """
    Полный тест "от А до Б":
    А — запускаем UseCase
    Б — в БД лежит полностью корректный Series (child), связанный с parent.
    """

    # ---- ARRANGE ----
    # Данные из фикстур
    parent_parsed, child_parsed = seed_parsed_series_parent_and_child
    parent_series = seed_series_parent

    # Создаём UseCase
    uc = ProcessSingleSeriesUseCase(
        uow_factory=uow_factory,
        parent_resolver_svc=ParentResolverService(),
    )

    # ---- ACT ----
    await uc.execute(parsed_series_id=child_parsed.id)

    # ---- ASSERT ----
    async with uow_factory.create() as uow:
        # 1. Проверяем, что создан объект Series (child)
        series_child = await uow.repos.series.get_one_by_fields_or_none(
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
        parsed_child_after = await uow.repos.parsed_series.get_one_by_fields_or_none(
            id=child_parsed.id
        )
        assert parsed_child_after.processing_state == ProcessingStates.PROCESSED
