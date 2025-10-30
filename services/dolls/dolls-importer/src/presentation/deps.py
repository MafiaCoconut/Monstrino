from fastapi import Request, Depends
from app.container import AppContainer, Services
from application.services.processing_service import ProcessingService


def get_container(request: Request) -> AppContainer:
    return request.app.state.container

def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

def get_processing_service(services: Services = Depends(get_services)) -> ProcessingService:
    return services.processing