
import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from application.registries.ports_registry import PortsRegistry
from application.use_cases.parse.parse_releases_use_case import ParseReleasesUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey


@pytest.mark.asyncio
async def test_parse_character_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list
):
    uc = ParseReleasesUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    parse_scope = ParseScope(
        year=2025,
    )
    await uc.execute(SourceKey.MHArchive, scope=parse_scope, batch_size=5, limit=10)