
from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort
from application.registries.ports_registry import PortsRegistry
from application.services.parser_service import ParserService
from app.container import Services
from application.services.scheduler_service import SchedulerService


def build_services(registry: PortsRegistry, logger: LoggerPort, scheduler: SchedulerPort) -> Services:
    return Services(
        parser=ParserService(
            registry=registry,
            logger=logger,
        ),
        scheduler=SchedulerService(scheduler=scheduler)
    )


