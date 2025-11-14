from application.services.scheduler_service import SchedulerService
from infrastructure.config.interfaces_config import scheduler_interface



def get_scheduler_service() -> SchedulerService:
    return SchedulerService(
        scheduler_interface=scheduler_interface,
    )
