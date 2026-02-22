import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories

from app.registries.ports_registry import PortsRegistry


@pytest.mark.asyncio
async def test_parse_release_official_simple(
    uow_factory: UnitOfWorkFactory[Repositories],
    registry: PortsRegistry,
    seed_source_list,
):

