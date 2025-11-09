import pytest
from monstrino_models.dto import ParsedPet
from monstrino_models.orm import ParsedPetsORM


@pytest.fixture
def parsed_pet() -> ParsedPet:
    return ParsedPet(
        name="Count Fabulous",
        description="Draculaura’s loyal pet bat.",
        owner_name="Draculaura",
        primary_image="https://example.com/images/count_fabulous.jpg",
        link="https://monsterhigh.fandom.com/wiki/Count_Fabulous",
        process_state="parsed",
        source="monsterhigh_fandom",
        original_html_content="<html><body>Count Fabulous details...</body></html>",
    )


@pytest.fixture
def parsed_pets() -> list[ParsedPet]:
    return [
        ParsedPet(
            name="Count Fabulous",
            description="Draculaura’s loyal pet bat.",
            owner_name="Draculaura",
            primary_image="https://example.com/images/count_fabulous.jpg",
            link="https://monsterhigh.fandom.com/wiki/Count_Fabulous",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Count Fabulous details...</body></html>",
        ),
        ParsedPet(
            name="Watzit",
            description="Frankie Stein’s pet monster dog stitched from several animals.",
            owner_name="Frankie Stein",
            primary_image="https://example.com/images/watzit.jpg",
            link="https://monsterhigh.fandom.com/wiki/Watzit",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Watzit details...</body></html>",
        ),
    ]


@pytest.fixture
def parsed_pets_orms() -> list[ParsedPetsORM]:
    return [
        ParsedPetsORM(
            name="Count Fabulous",
            description="Draculaura’s loyal pet bat.",
            owner_name="Draculaura",
            primary_image="https://example.com/images/count_fabulous.jpg",
            link="https://monsterhigh.fandom.com/wiki/Count_Fabulous",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Count Fabulous details...</body></html>",
        ),
        ParsedPetsORM(
            name="Watzit",
            description="Frankie Stein’s pet monster dog stitched from several animals.",
            owner_name="Frankie Stein",
            primary_image="https://example.com/images/watzit.jpg",
            link="https://monsterhigh.fandom.com/wiki/Watzit",
            process_state="parsed",
            source="monsterhigh_fandom",
            original_html_content="<html><body>Watzit details...</body></html>",
        ),
    ]


@pytest.fixture
async def seed_parsed_pets_db(engine, session_factory, parsed_pets_orms):
    """Асинхронное наполнение таблицы parsed_pets начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(parsed_pets_orms)
        await session.commit()
    yield
