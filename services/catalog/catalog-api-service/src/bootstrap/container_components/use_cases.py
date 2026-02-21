from dataclasses import dataclass

from app.use_cases import ReleaseSearchUseCase
from app.use_cases.release import GetReleaseTypesUseCase
from app.use_cases.release.get_release_id_by import GetReleaseIdByUseCase
from src.app.use_cases.get_release_by_id import GetReleaseByIdUseCase


@dataclass
class UseCases:
    # ---------- Release ---------
    get_release_id_by: GetReleaseIdByUseCase
    get_release_types: GetReleaseTypesUseCase
    get_release_by_id: GetReleaseByIdUseCase
    release_search: ReleaseSearchUseCase

