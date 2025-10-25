from dataclasses import dataclass

from application.ports.logger_port import LoggerPort
from application.repositories.doll_images_repository import DollsImagesRepository
from application.repositories.dolls_relations_repository import DollsRelationsRepository
from application.repositories.dolls_releases_repository import DollsReleasesRepository
from application.repositories.dolls_series_repository import DollsSeriesRepository
from application.repositories.dolls_types_repository import DollsTypesRepository
from application.repositories.original_characters_repository import OriginalCharactersRepository
from application.repositories.release_characters_repository import ReleaseCharactersRepository
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.services.scheduler_service import SchedulerService
from application.services.tables_data_manager_service import TablesDataManagerService


@dataclass
class Services:
    core: CoreService
    scheduler: SchedulerService
    db_internal: DBInternalService
    tables_data_manager: TablesDataManagerService

@dataclass
class Adapters:
    logger: LoggerPort

@dataclass
class Repositories:
    dolls_releases: DollsReleasesRepository
    dolls_images: DollsImagesRepository
    dolls_relations: DollsRelationsRepository
    dolls_series: DollsSeriesRepository
    dolls_types: DollsTypesRepository
    original_characters: OriginalCharactersRepository
    release_characters: ReleaseCharactersRepository


@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    repositories: Repositories

