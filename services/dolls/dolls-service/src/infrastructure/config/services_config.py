from app.container import Services, Repositories
from application.ports.scheduler_port import SchedulerPort
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.services.scenarios_service import ScenariosService
from application.services.scheduler_service import SchedulerService
from application.services.tables_data_manager_service import TablesDataManagerService


def build_services(repositories: Repositories, scheduler: SchedulerPort) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler),
        core=CoreService(),
        db_internal=DBInternalService(),
        tables_data_manager=TablesDataManagerService(repositories),
        scenarios=ScenariosService(repositories)
    )