from app.container import Services, Repositories
from application.ports.scheduler_port import SchedulerPort
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from infrastructure.config.repositories_config import dolls_repository


def build_services(repositories: Repositories, scheduler: SchedulerPort) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler),
        core=CoreService(dolls_repository=repositories.dolls)

    )