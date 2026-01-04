from monstrino_core.scheduler import SchedulerPort, Job

from domain.entities import ProcessJobs
from domain.enums import ProcessCronJobIDs


def scheduler_config(scheduler: SchedulerPort, process_jobs: ProcessJobs):
    _parsers_config(scheduler, process_jobs)

    scheduler.start()
    scheduler.print_all_jobs()


def _parsers_config(scheduler: SchedulerPort, process_jobs: ProcessJobs):
    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_CHARACTER,
            func=process_jobs.characters.execute,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={}
        )
    )

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_PET,
            func=process_jobs.pets.execute,
            trigger="cron",
            hour=2,
            minute=20,
            kwargs={}
        )
    )

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_SERIES,
            func=process_jobs.series.execute,
            trigger="cron",
            hour=2,
            minute=30,
            kwargs={}
        )
    )

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_RELEASE,
            func=process_jobs.releases.execute,
            trigger="cron",
            hour=2,
            minute=40,
            kwargs={}
        )
    )

