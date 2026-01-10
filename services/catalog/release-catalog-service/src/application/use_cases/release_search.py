from typing import Any, Optional
import logging

from icecream import ic

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
        ic(dto)
        async with self.uow_factory.create() as uow:
            filters = dto.query.filters
            query = dto.query
            results = await uow.repos.release_search.search(query)
            # ic(results)

            for result in results:
                ic(result)

