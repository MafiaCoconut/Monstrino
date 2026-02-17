from dataclasses import dataclass


@dataclass(frozen=True)
class PetRef:
    external_id: str
    url: str | None = None
import pytest

from monstrino_core.domain.value_objects.character import CharacterGender
from monstrino_models.dto import Character
from monstrino_models.orm import CharacterORM
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from monstrino_testing.fixtures import Repositories


@pytest.fixture
def character_frankie_stein() -> Character:
    return Character(
        name="frankie-stein",
        display_name="Frankie Stein",
        gender=CharacterGender.GHOUL,
        description="Daughter of Frankenstein, known for her positive attitude and iconic stitches.",
        primary_image="https://example.com/images/frankie.jpg",
        alt_names="Frankie; Franks",
        notes="First released in 2010."
    )

@pytest.fixture
def character_draculaura() -> Character:
    return Character(
        name="draculaura",
        display_name="Draculaura",
        gender=CharacterGender.GHOUL,
        description="Vampire with a big heart and love for pink.",
        primary_image="https://example.com/images/draculaura.jpg",
        alt_names="Lala",
        notes="Vegan vampire."
    )

@pytest.fixture
def character_cleo_de_nile() -> Character:
    return Character(
        name="cleo-de-nile",
        display_name="Cleo de Nile",
        gender=CharacterGender.GHOUL,
        description="",
        primary_image="https://example.com/images/cleo-de-nile.jpg",
        alt_names="Cleo",
        notes="Princess of the Nile."
    )

@pytest.fixture
def character_clawdeen_wolf() -> Character:
    return Character(
        name="clawdeen-wolf",
        display_name="Clawdeen Wolf",
        gender=CharacterGender.GHOUL,
        description="",
        primary_image="https://example.com/images/clawdeen-wolf.jpg",
        alt_names="Clawdeen",
        notes="Daughter of the Werewolf."
    )

@pytest.fixture
def character_deuce_gordon() -> Character:
    return Character(
        name="deuce-gorgon",
        display_name="Deuce Gorgon",
        gender=CharacterGender.MANSTER,
        description="",
        primary_image="https://example.com/images/deuce-gorgon.jpg",
        alt_names="Deuce",
        notes="Son of Medusa."
    )

@pytest.fixture
def character_lagoona_blue() -> Character:
    return Character(
        slug="lagoona-blue",
        title="Lagoona Blue",
        code="lagoona-blue",
        gender=CharacterGender.GHOUL,
        description="",
        primary_image="https://example.com/images/lagoona-blue.jpg",
        alt_names=["Lagoona"],
        notes="Daughter of the Sea Monster."
    )

@pytest.fixture
def character_list(
        character_frankie_stein,
        character_draculaura,
        character_clawdeen_wolf,
        character_deuce_gordon,
        character_cleo_de_nile,
        character_lagoona_blue,
) -> list[Character]:
    return [
        character_frankie_stein,
        character_draculaura,
        character_clawdeen_wolf,
        character_deuce_gordon,
        character_cleo_de_nile,
        character_lagoona_blue,
    ]


@pytest.fixture
async def seed_character(
        uow_factory: UnitOfWorkFactory[Repositories],
        character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save(character)


@pytest.fixture
async def seed_character_list(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_list,
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save_many(character_list)

@pytest.fixture
async def seed_character_cleo_de_nile(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_cleo_de_nile: Character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save(character_cleo_de_nile)

@pytest.fixture
async def seed_character_deuce_gordon(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_deuce_gordon: Character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save(character_deuce_gordon)

@pytest.fixture
async def seed_character_clawdeen_wolf(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_clawdeen_wolf: Character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save(character_clawdeen_wolf)


@pytest.fixture
async def seed_character_draculaura(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_draculaura: Character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        character = await uow.repos.character.get_one_by(**{Character.TITLE: character_draculaura.title})
        if not character:
            character = await uow.repos.character.save(character_draculaura)
        return character

@pytest.fixture
async def seed_character_frankie_stein(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_frankie_stein: Character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save(character_frankie_stein)

@pytest.fixture
async def seed_character_lagoona_blue(
        uow_factory: UnitOfWorkFactory[Repositories],
        character_lagoona_blue: Character
):
    """Асинхронное наполнение БД начальными данными для тестов."""
    async with uow_factory.create() as uow:
        return await uow.repos.character.save(character_lagoona_blue)

