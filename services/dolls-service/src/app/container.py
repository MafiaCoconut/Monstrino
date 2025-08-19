from dataclasses import dataclass

from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort
from application.repositories.dolls_repository import DollsRepository
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService


@dataclass
class Services:
    core: CoreService
    scheduler: SchedulerService

@dataclass
class Adapters:
    logger: LoggerPort

@dataclass
class Repositories:
    dolls: DollsRepository

@dataclass
class AppContainer:
    adapters: Adapters
    services: Services

