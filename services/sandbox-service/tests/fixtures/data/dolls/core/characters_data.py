import pytest
from monstrino_models.dto import Character
from monstrino_models.orm import CharactersORM


@pytest.fixture
def character() -> Character:
    return Character(
        name="Frankie Stein",
        display_name="Frankie Stein",
        gender_id=1,
        description="Daughter of Frankenstein, known for her positive attitude and iconic stitches.",
        primary_image="https://example.com/images/frankie.jpg",
        alt_names="Frankie; Franks",
        notes="First released in 2010."
    )


@pytest.fixture
def characters() -> list[Character]:
    return [
        Character(
            name="Frankie Stein",
            display_name="Frankie Stein",
            gender_id=1,
            description="Daughter of Frankenstein.",
            primary_image="https://example.com/images/frankie.jpg",
            alt_names="Frankie",
            notes="Student at Monster High."
        ),
        Character(
            name="Draculaura",
            display_name="Draculaura",
            gender_id=1,
            description="Vampire with a big heart and love for pink.",
            primary_image="https://example.com/images/draculaura.jpg",
            alt_names="Lala",
            notes="Vegan vampire."
        ),
    ]


@pytest.fixture
def characters_orms() -> list[CharactersORM]:
    return [
        CharactersORM(
            name="Frankie Stein",
            display_name="Frankie Stein",
            gender_id=1,
            description="Daughter of Frankenstein.",
            primary_image="https://example.com/images/frankie.jpg",
            alt_names="Frankie",
            notes="Student at Monster High."
        ),
        CharactersORM(
            name="Draculaura",
            display_name="Draculaura",
            gender_id=1,
            description="Vampire with a big heart and love for pink.",
            primary_image="https://example.com/images/draculaura.jpg",
            alt_names="Lala",
            notes="Vegan vampire."
        ),
    ]


@pytest.fixture
async def seed_characters_db(engine, session_factory, characters_orms, seed_character_genders_db):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(characters_orms)
        await session.commit()

    yield