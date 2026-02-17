import pytest

from app.ports.parse.parse_market_port import ParseMarketPort
from app.registries.ports_registry import PortsRegistry
from domain.enums import MarketSources


@pytest.fixture
def registry(adapters):
    registry = PortsRegistry

    registry.register(
        market_source=MarketSources.MATTEL_SHOP,
        port_type=ParseMarketPort,
        impl=adapters.parser_mattel_shop
    )