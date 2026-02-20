from application.use_cases import ReleaseSearchUseCase
from src.application.use_cases.get_release_by_id import GetReleaseByIdUseCase

from ..container_components.use_cases import UseCases

def build_use_cases(uow_factory):
    return UseCases(
        get_release_by_id=GetReleaseByIdUseCase(uow_factory=uow_factory),
        release_search=ReleaseSearchUseCase(uow_factory=uow_factory)
    )