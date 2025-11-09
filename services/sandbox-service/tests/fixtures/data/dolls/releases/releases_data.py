import pytest
from monstrino_models.dto import Release
from monstrino_models.orm import ReleasesORM


@pytest.fixture
def release() -> Release:
    return Release(
        name="Draculaura Ghouls Rule",
        display_name="Draculaura - Ghouls Rule",
        mpn="MH12345",
        type_ids=[1],
        exclusive_ids=[1],
        year=2012,
        description="Special Halloween edition of Draculaura with gothic dress and bat accessories.",
        from_the_box="Be yourself. Be unique. Be a monster!",
        link="https://monsterhigh.fandom.com/wiki/Draculaura_(Ghouls_Rule)",
    )


@pytest.fixture
def releases() -> list[Release]:
    return [
        Release(
            name="Draculaura Ghouls Rule",
            display_name="Draculaura - Ghouls Rule",
            mpn="MH12345",
            type_ids=[1],
            exclusive_ids=[1],
            year=2012,
            description="Halloween-themed Draculaura release.",
            from_the_box="Be yourself. Be unique. Be a monster!",
            link="https://monsterhigh.fandom.com/wiki/Draculaura_(Ghouls_Rule)",
        ),
        Release(
            name="Frankie Stein Sweet 1600",
            display_name="Frankie Stein - Sweet 1600",
            mpn="MH23456",
            type_ids=[1, 2],
            exclusive_ids=[2],
            year=2012,
            description="Anniversary Sweet 1600 release for Frankie Stein.",
            from_the_box="Party like it's your 1600th birthday!",
            link="https://monsterhigh.fandom.com/wiki/Frankie_Stein_(Sweet_1600)",
        ),
    ]


@pytest.fixture
def releases_orms() -> list[ReleasesORM]:
    return [
        ReleasesORM(
            name="Draculaura Ghouls Rule",
            display_name="Draculaura - Ghouls Rule",
            mpn="MH12345",
            type_ids=[1],
            exclusive_ids=[1],
            year=2012,
            description="Halloween-themed Draculaura release.",
            from_the_box="Be yourself. Be unique. Be a monster!",
            link="https://monsterhigh.fandom.com/wiki/Draculaura_(Ghouls_Rule)",
        ),
        ReleasesORM(
            name="Frankie Stein Sweet 1600",
            display_name="Frankie Stein - Sweet 1600",
            mpn="MH23456",
            type_ids=[1, 2],
            exclusive_ids=[2],
            year=2012,
            description="Anniversary Sweet 1600 release for Frankie Stein.",
            from_the_box="Party like it's your 1600th birthday!",
            link="https://monsterhigh.fandom.com/wiki/Frankie_Stein_(Sweet_1600)",
        ),
    ]


@pytest.fixture
async def seed_releases_db(engine, session_factory, releases_orms):
    """Асинхронное наполнение таблицы releases начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(releases_orms)
        await session.commit()
    yield
