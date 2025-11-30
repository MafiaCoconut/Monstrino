from app.container_components import Adapters, Services, Repositories
from application.services.scheduler_service import SchedulerService


def build_services(repositories: Repositories, adapters: Adapters, ) -> Services:
    return Services(
        scheduler=SchedulerService(scheduler=adapters.scheduler),
    )