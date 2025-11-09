import pytest
from monstrino_models.dto import ReleasePet
from monstrino_models.orm import ReleasePetsORM, ReleasesORM, PetsORM


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
            name="Frankie Stein Sweet 1600",
            display_name="Frankie Stein - Sweet 1600",
            year=2012,
            description="Anniversary Sweet 1600 release.",
        ),
    ]


@pytest.fixture
def pets_orms() -> list[PetsORM]:
    return [
        PetsORM(
            name="Count Fabulous",
            display_name="Count Fabulous",
            description="Draculaura’s loyal pet bat.",
            owner_id=1,
        ),
        PetsORM(
            name="Watzit",
            display_name="Watzit",
            description="Frankie Stein’s stitched-together pet dog.",
            owner_id=2,
        ),
    ]


@pytest.fixture
async def seed_release_pet_dependencies_db(
        engine,
        session_factory,
        pets_orms,
        seed_characters_db,
        seed_releases_db,
):
    """Асинхронное наполнение зависимых таблиц (releases, pets)."""
    async with session_factory() as session:
        session.add_all(pets_orms)
        await session.commit()
    yield


# ========== Main Fixtures ==========

@pytest.fixture
def release_pet() -> ReleasePet:
    return ReleasePet(
        release_id=1,
        pet_id=1,
        position=0,
    )


@pytest.fixture
def release_pets() -> list[ReleasePet]:
    return [
        ReleasePet(release_id=1, pet_id=1, position=0),
        ReleasePet(release_id=2, pet_id=2, position=1),
    ]


@pytest.fixture
def release_pets_orms() -> list[ReleasePetsORM]:
    return [
        ReleasePetsORM(release_id=1, pet_id=1, position=0),
        ReleasePetsORM(release_id=2, pet_id=2, position=1),
    ]


@pytest.fixture
async def seed_release_pets_db(
    engine,
    session_factory,
    release_pets_orms,
    seed_release_pet_dependencies_db,
):
    """Асинхронное наполнение таблицы release_pets начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_pets_orms)
        await session.commit()
    yield
