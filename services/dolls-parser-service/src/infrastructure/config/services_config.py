from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort
from application.registries.ports_registry import PortsRegistry
from application.services.parser_service import ParserService
from app.container import Services, Adapters
from application.services.scheduler_service import SchedulerService


def build_services(registry: PortsRegistry, adapters: Adapters, repositories: Repositories) -> Services:
    return Services(
        parser=ParserService(
            registry=registry,
            logger=adapters.logger,
            kafka_producer=adapters.kafka_producer,
            repositories=repositories
        ),
        scheduler=SchedulerService(scheduler=adapters.scheduler)
    )


