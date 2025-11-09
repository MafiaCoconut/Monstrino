import pytest
from monstrino_models.dto import ReleaseCharacter
from monstrino_models.orm import (
    ReleaseCharactersORM,
    ReleasesORM,
    CharactersORM,
    ReleaseCharacterRolesORM,
)


# ========== Dependencies ==========

@pytest.fixture
def releases_orms() -> list[ReleasesORM]:
    return [
        ReleasesORM(
            name="Ghouls Rule Draculaura",
            display_name="Draculaura - Ghouls Rule",
            year=2012,
            description="Special Halloween edition of Draculaura.",
        ),
        ReleasesORM(
            name="Sweet 1600 Frankie Stein",
            display_name="Frankie Stein - Sweet 1600",
            year=2012,
            description="Frankie's Sweet 1600 anniversary release.",
        ),
    ]


@pytest.fixture
def characters_orms() -> list[CharactersORM]:
    return [
        CharactersORM(
            name="Draculaura",
            display_name="Draculaura",
            gender_id=1,
            description="Vampire student at Monster High.",
        ),
        CharactersORM(
            name="Frankie Stein",
            display_name="Frankie Stein",
            gender_id=1,
            description="Daughter of Frankenstein, known for her bright personality.",
        ),
    ]


@pytest.fixture
def release_character_roles_orms() -> list[ReleaseCharacterRolesORM]:
    return [
        ReleaseCharacterRolesORM(
            name="main",
            description="The primary character featured in the release.",
        ),
        ReleaseCharacterRolesORM(
            name="secondary",
            description="A supporting or accessory character.",
        ),
    ]


@pytest.fixture
async def seed_release_character_dependencies_db(
    engine,
    session_factory,
    releases_orms,
    characters_orms,
    release_character_roles_orms,
    seed_character_genders_db,
):
    """Асинхронное наполнение зависимых таблиц (releases, characters, release_character_roles)."""
    async with session_factory() as session:
        session.add_all(releases_orms + characters_orms + release_character_roles_orms)
        await session.commit()
    yield


# ========== Main Fixtures ==========

@pytest.fixture
def release_character() -> ReleaseCharacter:
    return ReleaseCharacter(
        release_id=1,
        character_id=1,
        role_id=1,
        position=0,
    )


@pytest.fixture
def release_characters() -> list[ReleaseCharacter]:
    return [
        ReleaseCharacter(
            release_id=1,
            character_id=1,
            role_id=1,
            position=0,
        ),
        ReleaseCharacter(
            release_id=2,
            character_id=2,
            role_id=1,
            position=1,
        ),
    ]


@pytest.fixture
def release_characters_orms() -> list[ReleaseCharactersORM]:
    return [
        ReleaseCharactersORM(
            release_id=1,
            character_id=1,
            role_id=1,
            position=0,
        ),
        ReleaseCharactersORM(
            release_id=2,
            character_id=2,
            role_id=1,
            position=1,
        ),
    ]


@pytest.fixture
async def seed_release_characters_db(
    engine,
    session_factory,
    release_characters_orms,
    seed_release_character_dependencies_db,
):
    """Асинхронное наполнение таблицы release_characters начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_characters_orms)
        await session.commit()
    yield
