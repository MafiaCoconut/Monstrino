from app.container import Services, Repositories
from application.ports.scheduler_port import SchedulerPort
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.services.scheduler_service import SchedulerService
from application.services.tables_data_manager_service import TablesDataManagerService


def build_services(repositories: Repositories, scheduler: SchedulerPort) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler),
        core=CoreService(),
        db_internal=DBInternalService(),
        tables_data_manager=TablesDataManagerService(
            dolls_releases_repo=repositories.dolls_releases,
            dolls_types_repo=repositories.dolls_types,
            dolls_series_repo=repositories.dolls_series,
            dolls_images_repo=repositories.dolls_images,
            dolls_relations_repo=repositories.dolls_relations,
            original_characters_repo=repositories.original_characters,
            release_characters_repo=repositories.release_characters,
        )
    )