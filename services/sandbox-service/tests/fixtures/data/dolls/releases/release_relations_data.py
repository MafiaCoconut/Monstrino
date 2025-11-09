import pytest
from monstrino_models.dto import ReleaseRelation
from monstrino_models.orm import ReleaseRelationsORM, ReleasesORM, ReleaseRelationTypesORM


# ========== Dependencies ==========

@pytest.fixture
def releases_orms() -> list[ReleasesORM]:
    return [
        ReleasesORM(
            name="Draculaura Ghouls Rule",
            display_name="Draculaura - Ghouls Rule",
            year=2012,
            description="Halloween edition of Draculaura.",
        ),
        ReleasesORM(
            name="Draculaura Ghouls Rule Reissue",
            display_name="Draculaura - Ghouls Rule (Reissue)",
            year=2015,
            description="Reissued version of the original Draculaura Ghouls Rule doll.",
        ),
        ReleasesORM(
            name="Draculaura Collector Edition",
            display_name="Draculaura - Collector Edition",
            year=2020,
            description="Premium collector’s reimagining of Draculaura.",
        ),
    ]


@pytest.fixture
def release_relation_types_orms() -> list[ReleaseRelationTypesORM]:
    return [
        ReleaseRelationTypesORM(
            name="reissue",
            display_name="Reissue",
            description="Indicates that this release reuses assets or concept of an earlier one.",
        ),
        ReleaseRelationTypesORM(
            name="variant",
            display_name="Variant",
            description="Slight variation of another release (different packaging or outfit).",
        ),
        ReleaseRelationTypesORM(
            name="collection_inclusion",
            display_name="Collection Inclusion",
            description="Belongs to the same thematic collection.",
        ),
    ]


@pytest.fixture
async def seed_release_relations_dependencies_db(
        engine,
        session_factory,
        seed_release_relation_types_db,
        seed_releases_db,

):
    """Асинхронное наполнение зависимых таблиц releases и release_relation_types начальными данными."""
    yield


# ========== Main Fixtures ==========

@pytest.fixture
def release_relation() -> ReleaseRelation:
    return ReleaseRelation(
        release_id=1,
        related_release_id=2,
        relation_type_id=1,
        note="2015 reissue with updated packaging.",
    )


@pytest.fixture
def release_relations() -> list[ReleaseRelation]:
    return [
        ReleaseRelation(
            release_id=1,
            related_release_id=2,
            relation_type_id=1,
            note="Reissued version in 2015.",
        ),
        ReleaseRelation(
            release_id=1,
            related_release_id=3,
            relation_type_id=3,
            note="Included in Collector’s Edition bundle.",
        ),
    ]


@pytest.fixture
def release_relations_orms() -> list[ReleaseRelationsORM]:
    return [
        ReleaseRelationsORM(
            release_id=1,
            related_release_id=2,
            relation_type_id=1,
            note="Reissued version in 2015.",
        ),
        ReleaseRelationsORM(
            release_id=1,
            related_release_id=3,
            relation_type_id=3,
            note="Included in Collector’s Edition bundle.",
        ),
    ]


@pytest.fixture
async def seed_release_relations_db(
    engine,
    session_factory,
    release_relations_orms,
    seed_release_relations_dependencies_db,
):
    """Асинхронное наполнение таблицы release_relations начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_relations_orms)
        await session.commit()
    yield
