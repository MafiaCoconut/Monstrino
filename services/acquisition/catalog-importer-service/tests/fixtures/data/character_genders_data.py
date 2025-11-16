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
def character_gender() -> list[CharacterGender]:
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
def character_gender_orms() -> list[CharacterGendersORM]:
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
async def seed_character_gender_list(
        uow_factory: UnitOfWorkFactory[Repositories],
        , character_gender_orms):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.needReplacement.save_many(character_gender_orms)
        await session.commit()

    # Передача управления тесту
    yield

    # После выполнения тестов — очистка (по желанию)
    # async with engine.begin() as conn:
    #     for table in reversed(session_factory.kw["bind"].metadata.sorted_tables):
    #         await conn.execute(table.delete())
    #     await conn.commit()
