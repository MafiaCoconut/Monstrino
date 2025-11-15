from fastapi import Request, Depends
from app.container import AppContainer, Services
from application.services.processing_service import ProcessingService


from application.services.db_internal_service import DBInternalService


def get_db_internal_service(request: Request) -> DBInternalService:
    return request.app.state.container.services.db_internal

def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

def get_processing_service(services: Services = Depends(get_services)) -> ProcessingService:
    return services.processing