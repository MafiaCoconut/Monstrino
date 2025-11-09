import pytest
from monstrino_models.dto import ReleaseCharacterRole
from monstrino_models.orm import ReleaseCharacterRolesORM


@pytest.fixture
def release_character_role() -> ReleaseCharacterRole:
    return ReleaseCharacterRole(
        name="main",
        description="The primary character featured in the release.",
    )


@pytest.fixture
def release_character_roles() -> list[ReleaseCharacterRole]:
    return [
        ReleaseCharacterRole(
            name="main",
            description="The primary character featured in the release.",
        ),
        ReleaseCharacterRole(
            name="secondary",
            description="A supporting character included as an accessory or packmate.",
        ),
        ReleaseCharacterRole(
            name="variant",
            description="An alternate version of an existing character (e.g. color or outfit variant).",
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
            description="A supporting character included as an accessory or packmate.",
        ),
        ReleaseCharacterRolesORM(
            name="variant",
            description="An alternate version of an existing character (e.g. color or outfit variant).",
        ),
    ]


@pytest.fixture
async def seed_release_character_roles_db(engine, session_factory, release_character_roles_orms):
    """Асинхронное наполнение таблицы release_character_roles начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_character_roles_orms)
        await session.commit()
    yield
