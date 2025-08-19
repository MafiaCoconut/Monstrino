from dataclasses import dataclass

from application.ports.logger_port import LoggerPort
from application.services.auth_service import AuthService
from application.services.scheduler_service import SchedulerService
from application.services.users_service import UsersService


@dataclass
class Services:
    auth: AuthService
    users: UsersService
    scheduler: SchedulerService

@dataclass
class Adapters:
    logger: LoggerPort

@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
