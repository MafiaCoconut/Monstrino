from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from src.application.ports import Repositories


class ClaimJobsUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],

    ):
        self.uow_factory = uow_factory


    async def execute(self, limit: int):
        async with self.uow_factory.create() as uow:
            jobs = await uow.repos.media_ingestion_job.claim_jobs(limit)
            return jobs