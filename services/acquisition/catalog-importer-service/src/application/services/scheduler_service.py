from monstrino_models.dto import Job

from application.ports.scheduler_port import SchedulerPort
from application.use_cases.scheduler.set_all_scheduler_jobs_use_case import SetAllSchedulerJobsUseCase


class SchedulerService:
    def __init__(self,
                 scheduler: SchedulerPort,
                 ):
        self.scheduler = scheduler

        self.set_all_schedulers_jobs = SetAllSchedulerJobsUseCase(
            scheduler=scheduler,
        )

    async def add_job(self, job: Job) -> None:
        await self.scheduler.add_job(job)

    async def add_all_jobs(self, jobs: list[Job]) -> None:
        for job in jobs:
            await self.scheduler.add_job(job)

    async def remove_job(self, job_id: str) -> None:
        await self.scheduler.remove_job(job_id)

    async def set_all_jobs(self) -> None:
        await self.set_all_schedulers_jobs.execute()

    async def get_all_jobs(self):
        return await self.scheduler.get_all_jobs()

