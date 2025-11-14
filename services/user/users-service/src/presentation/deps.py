from fastapi import Request, Depends
from app.container import AppContainer, Services
from application.services.core_service import CoreService


def get_container(request: Request) -> AppContainer:
    return request.app.state.container

def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

def get_core_service(services: Services = Depends(get_services)) -> CoreService:
    return services.core