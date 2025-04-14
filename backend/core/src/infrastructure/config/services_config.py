from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from infrastructure.config.interfaces_config import scheduler_interface, search_api_interface, google_interface


def get_scheduler_service() -> SchedulerService:
    return SchedulerService(
        scheduler_interface=scheduler_interface,
    )

def get_core_service() -> CoreService:
    return CoreService(

    )