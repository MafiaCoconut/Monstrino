from typing import Any, Optional

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Release
from monstrino_testing.fixtures import uow_factory

from app.ports import Repositories
from domain.models.release_search.release_filters import ReleaseFilters


class GetReleaseIdByUseCase:
    def __init__(self, uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]):
        self.uow_factory = uow_factory

    async def execute(self, filters: ReleaseFilters) -> Optional[int]:
        if filters.mpn is not None:
            async with self.uow_factory.create() as uow:
                release_id = await uow.repos.release.get_id_by(**{Release.MPN: filters.mpn})
                return release_id

        else:
            raise ValueError("At least one filter must be provided")



