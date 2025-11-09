import pytest
from monstrino_models.dto import ParsedRelease
from monstrino_models.orm import ParsedReleasesORM


@pytest.fixture
def parsed_release() -> ParsedRelease:
    return ParsedRelease(
        name="Draculaura Sweet 1600",
        characters={"main": ["Draculaura"]},
        series_name={"name": "Sweet 1600"},
        type_name={"type": "doll"},
        gender={"value": "female"},
        multi_pack={"is_multi": False},
        year={"value": 2012},
        exclusive_of_names={"value": ["Target"]},
        reissue_of=None,
        mpn={"code": "X12345"},
        pet_names={"value": ["Count Fabulous"]},
        description="Draculaura’s Sweet 1600 anniversary edition with special outfit.",
        from_the_box_text="It’s Draculaura’s 1600th birthday celebration!",
        primary_image="https://example.com/images/draculaura_sweet1600.jpg",
        images={"links": ["https://example.com/images/drac1.jpg", "https://example.com/images/drac2.jpg"]},
        images_link="https://example.com/gallery/sweet1600",
        link="https://monsterhigh.fandom.com/wiki/Draculaura_(Sweet_1600)",
        process_state="parsed",
        source="monsterhigh_fandom",
        original_html_content="<html><body>Parsed content...</body></html>",
        extra={"parsed_from": "wiki", "note": "limited edition"},
    )


@pytest.fixture
def parsed_releases() -> list[ParsedRelease]:
    return [
        ParsedRelease(
            name="Draculaura Sweet 1600",
            characters={"main": ["Draculaura"]},
            series_name={"name": "Sweet 1600"},
            type_name={"type": "doll"},
            gender={"value": "female"},
            year={"value": 2012},
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html>...</html>",
        ),
        ParsedRelease(
            name="Clawdeen Wolf Music Festival",
            characters={"main": ["Clawdeen Wolf"]},
            series_name={"name": "Music Festival"},
            type_name={"type": "doll"},
            gender={"value": "female"},
            year={"value": 2013},
            description="Festival outfit with fur jacket and purple guitar.",
            primary_image="https://example.com/images/clawdeen_musicfest.jpg",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html>...</html>",
        ),
    ]


@pytest.fixture
def parsed_releases_orms() -> list[ParsedReleasesORM]:
    return [
        ParsedReleasesORM(
            name="Draculaura Sweet 1600",
            characters={"main": ["Draculaura"]},
            series_name={"name": "Sweet 1600"},
            type_name={"type": "doll"},
            gender={"value": "female"},
            multi_pack={"is_multi": False},
            year={"value": 2012},
            exclusive_of_names={"value": ["Target"]},
            mpn={"code": "X12345"},
            pet_names={"value": ["Count Fabulous"]},
            description="Draculaura’s Sweet 1600 anniversary edition with special outfit.",
            primary_image="https://example.com/images/draculaura_sweet1600.jpg",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Parsed content...</body></html>",
        ),
        ParsedReleasesORM(
            name="Clawdeen Wolf Music Festival",
            characters={"main": ["Clawdeen Wolf"]},
            series_name={"name": "Music Festival"},
            type_name={"type": "doll"},
            gender={"value": "female"},
            year={"value": 2013},
            description="Festival outfit with fur jacket and purple guitar.",
            primary_image="https://example.com/images/clawdeen_musicfest.jpg",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Parsed content...</body></html>",
        ),
    ]


@pytest.fixture
async def seed_parsed_releases_db(engine, session_factory, parsed_releases_orms):
    """Асинхронное наполнение таблицы parsed_releases начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(parsed_releases_orms)
        await session.commit()
    yield
