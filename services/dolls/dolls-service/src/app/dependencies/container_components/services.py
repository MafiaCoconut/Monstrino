from dataclasses import dataclass
from application.services.core_service import CoreService
from application.services.db_internal_service import DBInternalService
from application.services.scenarios_service import ScenariosService
from application.services.scheduler_service import SchedulerService
from application.services.tables_data_manager_service import TablesDataManagerService


@dataclass
class Services:
    core: CoreService
    scheduler: SchedulerService
    db_internal: DBInternalService
    tables_data_manager: TablesDataManagerService
    scenarios: ScenariosService
