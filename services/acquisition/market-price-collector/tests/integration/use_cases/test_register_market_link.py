import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports.repositories import Repositories
from app.registries.ports_registry import PortsRegistry
from app.use_cases.register_market_link import RegisterReleaseMarketLink
from domain.enums import MarketSources


@pytest.mark.asyncio
async def test_uk(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_market_default_values
        ):
    parser = RegisterReleaseMarketLink(uow_factory, registry)
    await parser.execute(MarketSources.MATTEL_SHOP)
