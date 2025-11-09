import pytest
from monstrino_models.dto import ReleaseExclusive
from monstrino_models.orm import ReleaseExclusivesORM


@pytest.fixture
def release_exclusive() -> ReleaseExclusive:
    return ReleaseExclusive(
        name="comic_con",
        display_name="San Diego Comic-Con",
        description="Limited edition releases available exclusively at SDCC.",
        image_url="https://example.com/images/sdcc_exclusive.jpg",
    )


@pytest.fixture
def release_exclusives() -> list[ReleaseExclusive]:
    return [
        ReleaseExclusive(
            name="comic_con",
            display_name="San Diego Comic-Con",
            description="Limited edition releases available exclusively at SDCC.",
            image_url="https://example.com/images/sdcc_exclusive.jpg",
        ),
        ReleaseExclusive(
            name="target",
            display_name="Target",
            description="Retailer-exclusive releases available only in Target stores.",
            image_url="https://example.com/images/target_exclusive.jpg",
        ),
        ReleaseExclusive(
            name="mattel_creations",
            display_name="Mattel Creations",
            description="Online exclusives directly from Mattel Creations platform.",
            image_url="https://example.com/images/mattel_exclusive.jpg",
        ),
    ]


@pytest.fixture
def release_exclusives_orms() -> list[ReleaseExclusivesORM]:
    return [
        ReleaseExclusivesORM(
            name="comic_con",
            display_name="San Diego Comic-Con",
            description="Limited edition releases available exclusively at SDCC.",
            image_url="https://example.com/images/sdcc_exclusive.jpg",
        ),
        ReleaseExclusivesORM(
            name="target",
            display_name="Target",
            description="Retailer-exclusive releases available only in Target stores.",
            image_url="https://example.com/images/target_exclusive.jpg",
        ),
        ReleaseExclusivesORM(
            name="mattel_creations",
            display_name="Mattel Creations",
            description="Online exclusives directly from Mattel Creations platform.",
            image_url="https://example.com/images/mattel_exclusive.jpg",
        ),
    ]


@pytest.fixture
async def seed_release_exclusives_db(engine, session_factory, release_exclusives_orms):
    """Асинхронное наполнение таблицы release_exclusives начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_exclusives_orms)
        await session.commit()
    yield
