from fastapi import Request, Depends
from monstrino_core.scheduler import SchedulerPort

from bootstrap.container import AppContainer
from presentation.api.deps.container import get_container


def get_scheduler(container: AppContainer = Depends(get_container)) -> SchedulerPort:
    return container.adapters.scheduler