from dataclasses import dataclass

from application.ports.kafka_producer_port import KafkaProducerPort
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
    kafka_producer: KafkaProducerPort
    scheduler: SchedulerPort

@dataclass
class AppContainer:
    registry: PortsRegistry
    adapters: Adapters
    services: Services
