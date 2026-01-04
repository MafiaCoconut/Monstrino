from monstrino_core.scheduler import SchedulerPort

from domain.entities import ParseJobs
from domain.entities.job import Job
from domain.enums.parse_cron_job_ids import ParseCronJobIDs
from domain.enums.source_key import SourceKey


def scheduler_config(source: SourceKey, scheduler: SchedulerPort, parse_jobs: ParseJobs):
    _parsers_config(source, scheduler, parse_jobs)

    scheduler.start()
    scheduler.print_all_jobs()


def _parsers_config(source: SourceKey, scheduler: SchedulerPort, parse_jobs: ParseJobs):

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.PARSE_CHARACTER,
            func=parse_jobs.characters.execute,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={
                "source": source,
            }
        )
    )

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.PARSE_PET,
            func=parse_jobs.pets.execute,
            trigger="cron",
            hour=2,
            minute=20,
            kwargs={
                "source": source,
            }
        )
    )

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.PARSE_SERIES,
            func=parse_jobs.series.execute,
            trigger="cron",
            hour=2,
            minute=30,
            kwargs={
                "source": source,
            }
        )
    )

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.PARSE_RELEASE,
            func=parse_jobs.releases.execute,
            trigger="cron",
            hour=2,
            minute=40,
            kwargs={
                "source": source,
            }
        )
    )



def _mh_archive_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):
    source = SourceKey.MHArchive

