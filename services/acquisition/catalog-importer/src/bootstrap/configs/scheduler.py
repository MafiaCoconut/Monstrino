from monstrino_core.scheduler import SchedulerPort

from bootstrap.container_components import ProcessJobs
from domain.entities.job import Job
from domain.enums import ProcessCronJobIDs


def scheduler_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):
    _parsers_config(scheduler, parse_jobs)

    scheduler.start()
    scheduler.print_all_jobs()


def _parsers_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_CHARACTER,
            func=parse_jobs.characters.execute,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={}
        )
    )

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_PET,
            func=parse_jobs.pets.execute,
            trigger="cron",
            hour=2,
            minute=20,
            kwargs={}
        )
    )

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_SERIES,
            func=parse_jobs.series.execute,
            trigger="cron",
            hour=2,
            minute=30,
            kwargs={}
        )
    )

    scheduler.add_job(
        Job(
            id=ProcessCronJobIDs.PROCESS_RELEASE,
            func=parse_jobs.releases.execute,
            trigger="cron",
            hour=2,
            minute=40,
            kwargs={}
        )
    )



def _mh_archive_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):
    source = SourceKey.MHArchive

