# src/application/services/scheduler_service.py
from datetime import datetime

from application.interfaces.scheduler_interface import SchedulerInterface
from application.use_сases.set_all_scheduler_jobs_use_case import SetAllSchedulerJobsUseCase
from domain.job import Job

# from application.scheduler.interfaces.scheduler_interface import SchedulerInterface
# from application.scheduler.usecases.set_all_scheduler_use_case import SetAllSchedulersJobsUseCase
# from domain.entities.job import Job


class SchedulerService:
    def __init__(self,
                 scheduler_interface: SchedulerInterface,
                 ):
        self.scheduler_interface = scheduler_interface

        self.set_all_schedulers_jobs = SetAllSchedulerJobsUseCase(
            scheduler_interface=scheduler_interface,
        )

    async def add_job(self, job: Job) -> None:
        await self.scheduler_interface.add_job(job)

    async def add_all_jobs(self, jobs: list[Job]) -> None:
        for job in jobs:
            await self.scheduler_interface.add_job(job)

    async def delete_job(self, job_id: str) -> None:
        await self.scheduler_interface.delete_job(job_id)

    async def set_all_jobs(self) -> None:
        await self.set_all_schedulers_jobs.execute()

    async def get_all_jobs(self):
        return await self.scheduler_interface.get_all_jobs()

