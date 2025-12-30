from icecream import ic

from application.ports.scheduler_port import SchedulerPort
from domain.entities.job import Job
from domain.enums.parse_cron_job_ids import ParseCronJobIDs
from domain.enums.website_key import SourceKey
from infrastructure.jobs import ParsePetsJob, ParseReleasesJob, ParseSeriesJob
from infrastructure.jobs.parse_characters_job import ParseCharactersJob


def scheduler_config(scheduler: SchedulerPort, uow_factory, registry):
    _parsers_config(scheduler, uow_factory, registry)

    scheduler.start()
    scheduler.print_all_jobs()


def _parsers_config(scheduler: SchedulerPort, uow_factory, registry):
    _mh_archive_config(scheduler, uow_factory, registry)

def _mh_archive_config(scheduler: SchedulerPort, uow_factory, registry):
    source = SourceKey.MHArchive

    job = ParseCharactersJob(uow_factory=uow_factory, registry=registry)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_CHARACTER,
            func=job.execute,
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

    job = ParsePetsJob(uow_factory=uow_factory, registry=registry)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_PET,
            func=job.execute,
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

    job = ParseSeriesJob(uow_factory=uow_factory, registry=registry)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_SERIES,
            func=job.execute,
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

    job = ParseReleasesJob(uow_factory=uow_factory, registry=registry)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_RELEASE,
            func=job.execute,
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

