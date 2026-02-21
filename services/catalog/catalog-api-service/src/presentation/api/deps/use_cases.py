from fastapi import Request, Depends

from app.use_cases import ReleaseSearchUseCase
from app.use_cases.get_release_by_id import GetReleaseByIdUseCase
from app.use_cases.release import GetReleaseTypesUseCase
from app.use_cases.release.get_release_id_by import GetReleaseIdByUseCase
from bootstrap.container import AppContainer
from bootstrap.container_components.use_cases import UseCases
from presentation.api.deps.container import get_container

def get_use_cases(container: AppContainer = Depends(get_container)) -> UseCases:
    return container.use_cases

def get_use_case_get_release_id_by(use_cases: UseCases = Depends(get_use_cases)) -> GetReleaseIdByUseCase:
    return use_cases.get_release_id_by

def get_use_case_get_release_by_id(use_cases: UseCases = Depends(get_use_cases)) -> GetReleaseByIdUseCase:
    return use_cases.get_release_by_id

def get_use_case_get_release_types(use_cases: UseCases = Depends(get_use_cases)) -> GetReleaseTypesUseCase:
    return use_cases.get_release_types

def get_use_case_release_search(use_cases: UseCases = Depends(get_use_cases)) -> ReleaseSearchUseCase:
    return use_cases.release_search


