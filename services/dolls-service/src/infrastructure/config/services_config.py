from app.container import Services, Repositories
from application.ports.scheduler_port import SchedulerPort
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService


def build_services(repositories: Repositories, scheduler: SchedulerPort) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler),
        core=CoreService()

    )