from fastapi import Request, Depends
from app.container import AppContainer, Models
from presentation.api.deps import get_container


def get_models(container: AppContainer = Depends(get_container)) -> Models:
    return container.models

def get_mistral_model(models: Models = Depends(get_models)):
    return models.mistral

# def get_db_internal_service(request: Request) -> DBInternalService:
#     return request.app.state.container.services.db_internal
#
# def get_services(container: AppContainer = Depends(get_container)) -> Services:
#     return container.services
#
# def get_processing_service(services: Services = Depends(get_services)) -> ProcessingService:
#     return services.processing