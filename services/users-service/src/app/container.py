from dataclasses import dataclass

from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort
from application.repositories.refresh_token_repository import RefreshTokensRepository
from application.repositories.users_repository import UsersRepository
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from application.services.tokens_service import TokensService


@dataclass
class Services:
    core: CoreService
    tokens: TokensService
    scheduler: SchedulerService


@dataclass
class Repositories:
    users: UsersRepository
    refresh_token: RefreshTokensRepository


@dataclass
class Adapters:
    scheduler: SchedulerPort


@dataclass
class Adapters:
    logger: LoggerPort


@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    repositories: Repositories
