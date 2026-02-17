
import pytest
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports.repositories import Repositories
from app.registries.ports_registry import PortsRegistry
from app.use_cases.parse_by_external_id import ParseCharacterByExternalIdUseCase
from domain.enums.source_key import SourceKey



@pytest.mark.asyncio
async def test_parse_character_ghoul(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list,
):
    uc = ParseCharacterByExternalIdUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    external_id = "alien"
    gender = CharacterGender.GHOUL

    await uc.execute(SourceKey.MHArchive, external_id=external_id, gender=gender)

    async with uow_factory.create() as uow:
        characters = await uow.repos.parsed_character.get_all()
        assert len(characters) == 1

        character = characters[0]

        assert character.name == "Alien"
        assert character.description is None
        assert character.gender == gender
        # assert character.link == link_no_description()
        assert character.external_id == "alien"
        assert character.processing_state == ProcessingStates.INIT


@pytest.mark.asyncio
async def test_parse_character_manster(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list,
):
    uc = ParseCharacterByExternalIdUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    external_id = "clawd-wolf"
    gender = CharacterGender.MANSTER

    await uc.execute(SourceKey.MHArchive, external_id=external_id, gender=gender)

    async with uow_factory.create() as uow:
        characters = await uow.repos.parsed_character.get_all()
        assert len(characters) == 1

        character = characters[0]

        assert character.name == "Clawd Wolf"
        assert character.description.startswith("Clawd is a werewolf who is friendly")
        assert character.gender == gender
        # assert character.link == link_no_description()
        assert character.external_id == "clawd-wolf"
        assert character.processing_state == ProcessingStates.INIT


@pytest.mark.asyncio
async def test_parse_character_not_exists(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list,
):
    uc = ParseCharacterByExternalIdUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    external_id = "clawdwolf"
    gender = CharacterGender.MANSTER

    await uc.execute(SourceKey.MHArchive, external_id=external_id, gender=gender)

    async with uow_factory.create() as uow:
        characters = await uow.repos.parsed_character.get_all()
        assert len(characters) == 0

