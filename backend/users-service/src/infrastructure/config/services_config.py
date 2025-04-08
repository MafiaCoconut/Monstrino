from application.services import CoreService
from application.services.scheduler_service import SchedulerService
from infrastructure.config.interfaces_config import scheduler_interface
from infrastructure.config.repositories_config import usersRepository

def getCoreService():
    return CoreService(
        usersRepository=usersRepository,
    )


def get_scheduler_service() -> SchedulerService:
    return SchedulerService(
        scheduler_interface=scheduler_interface,
    )
