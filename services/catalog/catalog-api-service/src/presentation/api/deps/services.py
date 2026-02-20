from fastapi import Request, Depends
from bootstrap.container import AppContainer, Services
from presentation.api.deps.container import get_container


def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

