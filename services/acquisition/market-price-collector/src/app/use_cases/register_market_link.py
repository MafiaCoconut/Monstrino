from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from app.ports.parse.parse_market_port import ParseMarketPort
from app.ports.repositories import Repositories
from app.registries.ports_registry import PortsRegistry
from domain.enums import MarketSources


class RegisterReleaseMarketLink:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self._r = registry


    async def execute(self, market_source: MarketSources):
        """
        Flow
        1 зайти на сайт
        2. посмотреть есть ли новые релизы
        3. если есть сохранить

        :param market_source:
        :return:
        """

        port: ParseMarketPort = self._r.get(market_source, ParseMarketPort)
        await port.parse_all_release_links()

