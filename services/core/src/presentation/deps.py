from fastapi import Request, Depends
from app.container import AppContainer, Services
from application.services.auth_service import AuthService


def get_container(request: Request) -> AppContainer:
    return request.app.state.container

def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

def get_auth_service(services: Services = Depends(get_services)) -> AuthService:
    return services.auth