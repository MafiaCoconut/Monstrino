from dataclasses import dataclass

from application.use_cases import ReleaseSearchUseCase
from src.application.use_cases.get_release_by_id import GetReleaseByIdUseCase


@dataclass
class UseCases:
    get_release_by_id: GetReleaseByIdUseCase
    release_search: ReleaseSearchUseCase

