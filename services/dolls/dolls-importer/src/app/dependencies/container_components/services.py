from dataclasses import dataclass

from application.services.import_service import ProcessingService
from application.services.scheduler_service import SchedulerService


@dataclass
class Services:
    scheduler: SchedulerService
    processing: ProcessingService