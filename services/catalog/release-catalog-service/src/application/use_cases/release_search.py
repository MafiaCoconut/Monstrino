from typing import Any, Optional
import logging

from icecream import ic

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Release

from application.queries.release_search import ReleaseSearchQuery
from src.application.ports import Repositories


class ReleaseSearchUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
    ) -> None:
        self.uow_factory = uow_factory

    async def execute(
            self,
            query: ReleaseSearchQuery
    ):
        ic(query)
        async with self.uow_factory.create() as uow:
            release_list = await uow.repos.release.get_many_by(
                ranges=[(Release.YEAR, None, 2015)],
            )
            ic(release_list)