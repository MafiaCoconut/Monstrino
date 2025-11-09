import pytest
from monstrino_models.dto import CharacterGender
from monstrino_models.orm import CharacterGendersORM


@pytest.fixture
def character_gender():
    return CharacterGender(
        name="ghoul",
        display_name="Ghoul",
        plural_name="Ghouls"
    )

@pytest.fixture
def character_genders() -> list[CharacterGender]:
    return [
        CharacterGender(
            name="ghoul",
            display_name="Ghoul",
            plural_name="Ghouls"
        ),
        CharacterGender(
            name="manster",
            display_name="Manster",
            plural_name="Mansterss"
        )
    ]

@pytest.fixture
def character_genders_orms() -> list[CharacterGendersORM]:
    return [
        CharacterGendersORM(
            name="ghoul",
            display_name="Ghoul",
            plural_name="Ghouls"
        ),
        CharacterGendersORM(
            name="manster",
            display_name="Manster",
            plural_name="Mansterss"
        )
    ]


@pytest.fixture
async def seed_character_genders_db(engine, session_factory, character_genders_orms):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(character_genders_orms)
        await session.commit()

    yield
