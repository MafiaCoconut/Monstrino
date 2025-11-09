import pytest
from monstrino_models.dto import ReleaseType
from monstrino_models.orm import ReleaseTypesORM


@pytest.fixture
def release_type() -> ReleaseType:
    return ReleaseType(
        name="doll",
        display_name="Doll",
    )


@pytest.fixture
def release_types() -> list[ReleaseType]:
    return [
        ReleaseType(
            name="doll",
            display_name="Doll",
        ),
        ReleaseType(
            name="fashion_pack",
            display_name="Fashion Pack",
        ),
        ReleaseType(
            name="playset",
            display_name="Playset",
        ),
    ]


@pytest.fixture
def release_types_orms() -> list[ReleaseTypesORM]:
    return [
        ReleaseTypesORM(
            name="doll",
            display_name="Doll",
        ),
        ReleaseTypesORM(
            name="fashion_pack",
            display_name="Fashion Pack",
        ),
        ReleaseTypesORM(
            name="playset",
            display_name="Playset",
        ),
    ]


@pytest.fixture
async def seed_release_types_db(engine, session_factory, release_types_orms):
    """Асинхронное наполнение таблицы release_types начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_types_orms)
        await session.commit()
    yield
