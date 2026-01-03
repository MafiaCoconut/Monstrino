from fastapi import Request, Depends
from bootstrap.container import AppContainer, Services
from application.services.parser_service import ParserService


def get_container(request: Request) -> AppContainer:
    return request.app.state.container

def get_services(container: AppContainer = Depends(get_container)) -> Services:
    return container.services

# def get_parser_service(services: Services = Depends(get_services)) -> ParserService:
#     return services.parser