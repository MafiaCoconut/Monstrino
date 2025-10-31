from app.container import Services, Repositories
from app.dependencies.container_components.adapters import Adapters
from application.ports.scheduler_port import SchedulerPort
from application.services.processing_service import ProcessingService
from application.services.scheduler_service import SchedulerService


def build_services(repositories: Repositories, adapters: Adapters, ) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler=adapters.scheduler),
        processing=ProcessingService(repositories=repositories)
    )