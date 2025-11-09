import pytest
from monstrino_models.dto import Series
from monstrino_models.orm import SeriesORM


@pytest.fixture
def series() -> Series:
    return Series(
        name="Ghouls Rule",
        display_name="Ghouls Rule",
        description="A special Halloween-themed Monster High series.",
        series_type="dolls",
        primary_image="https://example.com/images/ghouls_rule.jpg",
    )


@pytest.fixture
def series_list() -> list[Series]:
    return [
        Series(
            name="Ghouls Rule",
            display_name="Ghouls Rule",
            description="Halloween collection with classic characters in spooky outfits.",
            series_type="dolls",
            primary_image="https://example.com/images/ghouls_rule.jpg",
        ),
        Series(
            name="Ghouls Rule Accessories",
            display_name="Ghouls Rule Accessories",
            description="Fashion packs inspired by the Ghouls Rule main line.",
            series_type="fashion_pack",
            primary_image="https://example.com/images/ghouls_rule_accessories.jpg",
            parent_id=1,
        ),
    ]


@pytest.fixture
def series_orms() -> list[SeriesORM]:
    return [
        SeriesORM(
            name="Ghouls Rule",
            display_name="Ghouls Rule",
            description="Halloween collection with classic characters in spooky outfits.",
            series_type="dolls",
            primary_image="https://example.com/images/ghouls_rule.jpg",
        ),
        SeriesORM(
            name="Ghouls Rule Accessories",
            display_name="Ghouls Rule Accessories",
            description="Fashion packs inspired by the Ghouls Rule main line.",
            series_type="fashion_pack",
            primary_image="https://example.com/images/ghouls_rule_accessories.jpg",
            parent_id=1,
        ),
    ]


@pytest.fixture
async def seed_series_db(engine, session_factory, series_orms):
    """Асинхронное наполнение таблицы series начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(series_orms)
        await session.commit()
    yield
