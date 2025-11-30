from dataclasses import dataclass

from application.services.scheduler_service import SchedulerService


@dataclass
class Services:
    scheduler: SchedulerService
