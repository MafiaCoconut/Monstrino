
import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.container_components.repositories import Repositories
from application.registries.ports_registry import PortsRegistry
from application.use_cases.parse.parse_characters_use_case import ParseCharactersUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey


@pytest.mark.asyncio
async def test_parse_character_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list,
):
    uc = ParseCharactersUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    scope = ParseScope()
    limit = 6

    await uc.execute(SourceKey.MHArchive, scope=scope, batch_size=10, limit=limit)

    async with uow_factory.create() as uow:
        characters = await uow.repos.parsed_character.get_all()
        assert len(characters) == limit