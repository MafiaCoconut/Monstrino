import pytest
from monstrino_models.dto import ReleaseRelationType
from monstrino_models.orm import ReleaseRelationTypesORM


@pytest.fixture
def release_relation_type() -> ReleaseRelationType:
    return ReleaseRelationType(
        name="reissue",
        display_name="Reissue",
        description="Indicates that this release is a reissued version of another product.",
    )


@pytest.fixture
def release_relation_types() -> list[ReleaseRelationType]:
    return [
        ReleaseRelationType(
            name="reissue",
            display_name="Reissue",
            description="Indicates a later re-release of a previous doll or pack.",
        ),
        ReleaseRelationType(
            name="variant",
            display_name="Variant",
            description="Represents a variation of a release (e.g., color or packaging differences).",
        ),
        ReleaseRelationType(
            name="collection_inclusion",
            display_name="Collection Inclusion",
            description="Marks that this release is part of a specific collection or subline.",
        ),
    ]


@pytest.fixture
def release_relation_types_orms() -> list[ReleaseRelationTypesORM]:
    return [
        ReleaseRelationTypesORM(
            name="reissue",
            display_name="Reissue",
            description="Indicates a later re-release of a previous doll or pack.",
        ),
        ReleaseRelationTypesORM(
            name="variant",
            display_name="Variant",
            description="Represents a variation of a release (e.g., color or packaging differences).",
        ),
        ReleaseRelationTypesORM(
            name="collection_inclusion",
            display_name="Collection Inclusion",
            description="Marks that this release is part of a specific collection or subline.",
        ),
    ]


@pytest.fixture
async def seed_release_relation_types_db(engine, session_factory, release_relation_types_orms):
    """Асинхронное наполнение таблицы release_relation_types начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_relation_types_orms)
        await session.commit()
    yield
