from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from infrastructure.config.interfaces_config import scheduler_interface
from infrastructure.config.repositories_config import dolls_repository


def get_core_service():
    return CoreService(
        dolls_repository=dolls_repository
    )

def get_scheduler_service() -> SchedulerService:
    return SchedulerService(
        scheduler_interface=scheduler_interface,
    )
