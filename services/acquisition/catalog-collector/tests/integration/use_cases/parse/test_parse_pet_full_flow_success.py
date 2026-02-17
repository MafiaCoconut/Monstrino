
import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports.repositories import Repositories
from app.registries.ports_registry import PortsRegistry
from app.use_cases.parse.parse_pets_use_case import ParsePetsUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey


@pytest.mark.asyncio
async def test_parse_pet_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list,
):
    uc = ParsePetsUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    scope = ParseScope()
    limit = 6
    await uc.execute(SourceKey.MHArchive, scope=scope, batch_size=10, limit=limit)

    async with uow_factory.create() as uow:
        characters = await uow.repos.parsed_pet.get_all()
        assert len(characters) == limit