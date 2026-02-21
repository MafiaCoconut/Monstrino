from app.use_cases import ReleaseSearchUseCase
from app.use_cases.release import GetReleaseTypesUseCase
from app.use_cases.release.get_release_id_by import GetReleaseIdByUseCase
from src.app.use_cases.get_release_by_id import GetReleaseByIdUseCase

from ..container_components.use_cases import UseCases

def build_use_cases(uow_factory):
    return UseCases(
        get_release_id_by=GetReleaseIdByUseCase(uow_factory=uow_factory),
        get_release_types=GetReleaseTypesUseCase(uow_factory=uow_factory),
        get_release_by_id=GetReleaseByIdUseCase(uow_factory=uow_factory),
        release_search=ReleaseSearchUseCase(uow_factory=uow_factory)
    )