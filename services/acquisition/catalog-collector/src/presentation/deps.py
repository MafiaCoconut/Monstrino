from fastapi import Request, Depends
from bootstrap.container import AppContainer, Services


def get_container(request: Request) -> AppContainer:
    return request.app.state.container

def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

