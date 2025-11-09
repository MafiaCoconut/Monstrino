import pytest
from monstrino_models.dto import ImageImportQueue
from monstrino_models.orm import ImageImportQueueORM


@pytest.fixture
def image_import_queue() -> ImageImportQueue:
    return ImageImportQueue(
        original_link="https://example.com/images/draculaura_raw.jpg",
        new_link=None,
        origin_reference_id=1,
        origin_record_id=1001,
        process_state="pending",
    )


@pytest.fixture
def image_import_queues() -> list[ImageImportQueue]:
    return [
        ImageImportQueue(
            original_link="https://example.com/images/draculaura_raw.jpg",
            new_link=None,
            origin_reference_id=1,
            origin_record_id=1001,
            process_state="pending",
        ),
        ImageImportQueue(
            original_link="https://example.com/images/frankie_raw.jpg",
            new_link="https://cdn.monstrino.com/images/frankie_processed.jpg",
            origin_reference_id=1,
            origin_record_id=1002,
            process_state="completed",
        ),
    ]


@pytest.fixture
def image_import_queues_orms() -> list[ImageImportQueueORM]:
    return [
        ImageImportQueueORM(
            original_link="https://example.com/images/draculaura_raw.jpg",
            new_link=None,
            origin_reference_id=1,
            origin_record_id=1001,
            process_state="pending",
        ),
        ImageImportQueueORM(
            original_link="https://example.com/images/frankie_raw.jpg",
            new_link="https://cdn.monstrino.com/images/frankie_processed.jpg",
            origin_reference_id=1,
            origin_record_id=1002,
            process_state="completed",
        ),
    ]


@pytest.fixture
async def seed_image_import_queue_db(engine, session_factory, image_import_queues_orms):
    """Асинхронное наполнение таблицы image_import_queue начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(image_import_queues_orms)
        await session.commit()
    yield
