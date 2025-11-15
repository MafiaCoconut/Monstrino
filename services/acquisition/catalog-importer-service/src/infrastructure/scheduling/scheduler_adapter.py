from typing import List

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from monstrino_core import Job

from application.ports.scheduler_port import SchedulerPort


class SchedulerAdapter(SchedulerPort):
    def __init__(self, scheduler: AsyncIOScheduler):
        self.scheduler = scheduler

    async def start(self) -> None:
        self.scheduler.start()

    async def add_job(self, job: Job) -> None:
        self.scheduler.add_job(
            func=job.func,
            trigger=job.trigger,
            day=job.day,
            hour=job.hour,
            minute=job.minute,
            args=job.args,
            id=job.id,
        )

    async def delete_job(self, job_id: str) -> None:
        self.scheduler.remove_job(job_id)

    async def get_all_jobs(self) -> List[str]:
        jobs = self.scheduler.get_jobs()
        return [f"{job.id} - {job.next_run_time}" for job in jobs]


