import pytest
from monstrino_models.dto import Pet
from monstrino_models.orm import PetsORM


@pytest.fixture
def pet() -> Pet:
    return Pet(
        name="Count Fabulous",
        display_name="Count Fabulous",
        description="Draculaura’s adorable pet bat with a gothic sense of style.",
        owner_id=1,
        primary_image="https://example.com/images/count_fabulous.jpg",
    )


@pytest.fixture
def pets() -> list[Pet]:
    return [
        Pet(
            name="Count Fabulous",
            display_name="Count Fabulous",
            description="Draculaura’s pet bat.",
            owner_id=1,
            primary_image="https://example.com/images/count_fabulous.jpg",
        ),
        Pet(
            name="Watzit",
            display_name="Watzit",
            description="Frankie Stein’s pet monster dog, stitched from several animals.",
            owner_id=2,
            primary_image="https://example.com/images/watzit.jpg",
        ),
    ]


@pytest.fixture
def pets_orms() -> list[PetsORM]:
    return [
        PetsORM(
            name="Count Fabulous",
            display_name="Count Fabulous",
            description="Draculaura’s pet bat.",
            owner_id=1,
            primary_image="https://example.com/images/count_fabulous.jpg",
        ),
        PetsORM(
            name="Watzit",
            display_name="Watzit",
            description="Frankie Stein’s pet monster dog.",
            owner_id=2,
            primary_image="https://example.com/images/watzit.jpg",
        ),
    ]


@pytest.fixture
async def seed_pets_db(engine, session_factory, pets_orms, seed_characters_db):
    """Асинхронное наполнение таблицы pets начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(pets_orms)
        await session.commit()
    yield