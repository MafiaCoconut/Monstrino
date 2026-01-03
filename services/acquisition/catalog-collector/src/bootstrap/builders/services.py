from bootstrap.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort
from application.registries.ports_registry import PortsRegistry
from application.services.parser_service import ParserService
from bootstrap.container import Services, Adapters
from application.services.scheduler_service import SchedulerService


def build_services(adapters: Adapters) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler=adapters.scheduler)
    )


