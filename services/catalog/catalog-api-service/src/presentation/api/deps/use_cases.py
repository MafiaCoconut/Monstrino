from fastapi import Request, Depends

from application.use_cases import ReleaseSearchUseCase
from application.use_cases.get_release_by_id import GetReleaseByIdUseCase
from bootstrap.container import AppContainer
from bootstrap.container_components.use_cases import UseCases
from presentation.api.deps.container import get_container

def get_use_cases(container: AppContainer = Depends(get_container)) -> UseCases:
    return container.use_cases


def get_use_case_get_release_by_id(use_cases: UseCases = Depends(get_use_cases)) -> GetReleaseByIdUseCase:
    return use_cases.get_release_by_id


def get_use_case_release_search(use_cases: UseCases = Depends(get_use_cases)) -> ReleaseSearchUseCase:
    return use_cases.release_search


