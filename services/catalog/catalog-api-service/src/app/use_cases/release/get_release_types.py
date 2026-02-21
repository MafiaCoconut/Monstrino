from typing import Any, Optional
import logging

from icecream import ic
from monstrino_core.domain.errors import EntityNotFoundError
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Release, ReleaseImage, ReleaseCharacter, Character, ReleasePet, ReleaseTypeLink

from src.app.ports import Repositories
from src.app.queries.get_release_by_id import GetReleaseByIdDTO
from src.domain.entities import *

class GetReleaseTypesUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],

    ):
        self.uow_factory = uow_factory
    
    async def execute(self) -> list[ReleaseType]:
        async with self.uow_factory.create() as uow:
            release_types = await uow.repos.release_type.get_all()
            
        rt_list = []
        for rt in release_types:
            rt_list.append(
                ReleaseType(
                    code=rt.code,
                    title=rt.title,
                    category=rt.category,
                )
            )
        
        return rt_list