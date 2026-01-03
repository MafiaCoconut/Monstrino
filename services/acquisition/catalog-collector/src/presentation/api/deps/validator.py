from fastapi import Depends

from app.container import AppContainer
from app.container_components import Validators
from presentation.api.deps.container import get_container


def get_validator(container: AppContainer = Depends(get_container)) -> Validators:
    return container.validators


def get_parsing_request_validator(validators: Validators = Depends(get_validator)):
    return validators.parsing_requests
