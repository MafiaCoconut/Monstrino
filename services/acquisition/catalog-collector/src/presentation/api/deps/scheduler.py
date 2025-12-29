from fastapi import Request, Depends
from app.container import AppContainer
from application.ports.scheduler_port import SchedulerPort
from presentation.api.deps.container import get_container


def get_scheduler(container: AppContainer = Depends(get_container)) -> SchedulerPort:
    return container.adapters.scheduler