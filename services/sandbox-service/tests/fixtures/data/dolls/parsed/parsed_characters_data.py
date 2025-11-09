import pytest
from monstrino_models.dto import ParsedCharacter
from monstrino_models.orm import ParsedCharactersORM


@pytest.fixture
def parsed_character() -> ParsedCharacter:
    return ParsedCharacter(
        name="Frankie Stein",
        gender="female",
        description="Student at Monster High, daughter of Frankenstein.",
        primary_image="https://example.com/images/frankie.jpg",
        link="https://monsterhigh.fandom.com/wiki/Frankie_Stein",
        process_state="parsed",
        source="monsterhigh_fandom",
        original_html_content="<html><body>Frankie Stein details...</body></html>",
    )


@pytest.fixture
def parsed_characters() -> list[ParsedCharacter]:
    return [
        ParsedCharacter(
            name="Frankie Stein",
            gender="female",
            description="Daughter of Frankenstein.",
            primary_image="https://example.com/images/frankie.jpg",
            link="https://monsterhigh.fandom.com/wiki/Frankie_Stein",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Frankie data...</body></html>",
        ),
        ParsedCharacter(
            name="Draculaura",
            gender="female",
            description="Vampire and daughter of Dracula.",
            primary_image="https://example.com/images/draculaura.jpg",
            link="https://monsterhigh.fandom.com/wiki/Draculaura",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Draculaura data...</body></html>",
        ),
    ]


@pytest.fixture
def parsed_characters_orms() -> list[ParsedCharactersORM]:
    return [
        ParsedCharactersORM(
            name="Frankie Stein",
            gender="female",
            description="Daughter of Frankenstein.",
            primary_image="https://example.com/images/frankie.jpg",
            link="https://monsterhigh.fandom.com/wiki/Frankie_Stein",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Frankie data...</body></html>",
        ),
        ParsedCharactersORM(
            name="Draculaura",
            gender="female",
            description="Vampire and daughter of Dracula.",
            primary_image="https://example.com/images/draculaura.jpg",
            link="https://monsterhigh.fandom.com/wiki/Draculaura",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Draculaura data...</body></html>",
        ),
    ]


@pytest.fixture
async def seed_parsed_characters_db(engine, session_factory, parsed_characters_orms):
    """Асинхронное наполнение таблицы parsed_characters начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(parsed_characters_orms)
        await session.commit()
    yield
