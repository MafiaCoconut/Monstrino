from fastapi import Request, Depends
from app.container import AppContainer, Services
from application.services.processing_service import ProcessingService


def get_container(request: Request) -> AppContainer:
    return request.app.state.container

