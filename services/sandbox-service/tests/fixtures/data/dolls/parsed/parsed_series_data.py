import pytest
from monstrino_models.dto import ParsedSeries
from monstrino_models.orm import ParsedSeriesORM


@pytest.fixture
def parsed_series() -> ParsedSeries:
    return ParsedSeries(
        name="Ghouls Rule",
        description="A Halloween-themed Monster High doll line.",
        series_type="dolls",
        primary_image="https://example.com/images/ghouls_rule.jpg",
        link="https://monsterhigh.fandom.com/wiki/Ghouls_Rule",
        parent_id=None,
        parent_name=None,
        process_state="parsed",
        source="monsterhigh_fandom",
        original_html_content="<html><body>Ghouls Rule series content...</body></html>",
    )


@pytest.fixture
def parsed_series_list() -> list[ParsedSeries]:
    return [
        ParsedSeries(
            name="Ghouls Rule",
            description="A Halloween-themed series featuring iconic characters.",
            series_type="dolls",
            primary_image="https://example.com/images/ghouls_rule.jpg",
            link="https://monsterhigh.fandom.com/wiki/Ghouls_Rule",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html>...</html>",
        ),
        ParsedSeries(
            name="Ghouls Rule Accessories",
            description="Accessory subline of Ghouls Rule collection.",
            series_type="fashion_pack",
            primary_image="https://example.com/images/ghouls_rule_accessories.jpg",
            link="https://monsterhigh.fandom.com/wiki/Ghouls_Rule_Accessories",
            parent_id=1,
            parent_name="Ghouls Rule",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html>...</html>",
        ),
    ]


@pytest.fixture
def parsed_series_orms() -> list[ParsedSeriesORM]:
    return [
        ParsedSeriesORM(
            name="Ghouls Rule",
            description="A Halloween-themed series featuring iconic characters.",
            series_type="dolls",
            primary_image="https://example.com/images/ghouls_rule.jpg",
            link="https://monsterhigh.fandom.com/wiki/Ghouls_Rule",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html>...</html>",
        ),
        ParsedSeriesORM(
            name="Ghouls Rule Accessories",
            description="Accessory subline of Ghouls Rule collection.",
            series_type="fashion_pack",
            primary_image="https://example.com/images/ghouls_rule_accessories.jpg",
            link="https://monsterhigh.fandom.com/wiki/Ghouls_Rule_Accessories",
            parent_id=1,
            parent_name="Ghouls Rule",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html>...</html>",
        ),
    ]


@pytest.fixture
async def seed_parsed_series_db(engine, session_factory, parsed_series_orms):
    """Асинхронное наполнение таблицы parsed_series начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(parsed_series_orms)
        await session.commit()
    yield
