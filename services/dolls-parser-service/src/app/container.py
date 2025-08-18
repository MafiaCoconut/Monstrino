from dataclasses import dataclass

from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort
from application.ports.website_catalog_port import WebsiteCatalogPort
from application.registries.ports_registry import PortsRegistry
from application.services.parser_service import ParserService
from application.services.scheduler_service import SchedulerService


@dataclass
class Services:
    parser: ParserService
    scheduler: SchedulerService

@dataclass
class Adapters:
    MHArchive: WebsiteCatalogPort
    logger: LoggerPort

@dataclass
class AppContainer:
    registry: PortsRegistry
    adapters: Adapters
    services: Services

    # async def shutdown(self) -> None:
    #     # закрываем внешние ресурсы по мере надобности
    #     if hasattr(self.gateways.scheduler, "stop"):
    #         await self.gateways.scheduler.stop()
    #     if hasattr(self.db, "aclose"):
    #         await self.db.aclose()