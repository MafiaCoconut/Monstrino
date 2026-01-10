from typing import Any, Optional
import logging

from icecream import ic
from monstrino_core.application.pagination import Page

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Release, ReleaseSeriesLink

from application.queries.release_search import ReleaseSearchDTO
from src.application.ports import Repositories


class ReleaseSearchUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
    ) -> None:
        self.uow_factory = uow_factory

    async def execute(
            self,
            dto: ReleaseSearchDTO
    ):
        """
        Inside logic:
        Release filters logic
        if

        :param dto:
        :return:
        """
        async with self.uow_factory.create() as uow:
            query = dto.query
            results: Page = await uow.repos.release_search.search(query)
            return results

