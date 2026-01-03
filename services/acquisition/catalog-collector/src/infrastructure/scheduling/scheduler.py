from app.container_components import ParseJobs
from application.ports.scheduler_port import SchedulerPort
from domain.entities.job import Job
from domain.enums.parse_cron_job_ids import ParseCronJobIDs
from domain.enums.source_key import SourceKey


def scheduler_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):
    _parsers_config(scheduler, parse_jobs)

    scheduler.start()
    scheduler.print_all_jobs()


def _parsers_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):
    _mh_archive_config(scheduler, parse_jobs)

def _mh_archive_config(scheduler: SchedulerPort, parse_jobs: ParseJobs):
    source = SourceKey.MHArchive

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_CHARACTER,
            func=parse_jobs.characters.execute,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={
                "source": source,
                "batch_size": 10,
                "limit": 3, # TODO Change on production
            }
        )
    )

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_PET,
            func=parse_jobs.pets.execute,
            trigger="cron",
            hour=14,
            minute=17,
            kwargs={
                "source": source,
                "batch_size": 10,
                "limit": 3, # TODO Change on production
            }
        )
    )

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_SERIES,
            func=parse_jobs.series.execute,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={
                "source": source,
                "batch_size": 10,
                "limit": 3, # TODO Change on production
            }
        )
    )

    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_RELEASE,
            func=parse_jobs.releases.execute,
            trigger="cron",
            hour=20,
            minute=49,
            kwargs={
                "source": source,
                "batch_size": 10,
                "limit": 3, # TODO Change on production
            }
        )
    )

