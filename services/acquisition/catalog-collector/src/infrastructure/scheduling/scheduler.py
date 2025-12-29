from icecream import ic

from application.ports.scheduler_port import SchedulerPort
from domain.entities.job import Job
from domain.enums.parse_cron_job_ids import ParseCronJobIDs
from domain.enums.website_key import SourceKey
from infrastructure.scheduling.jobs import ParsePetsCronJob, ParseSeriesCronJob, ParseReleasesCronJob, ParseCharactersCronJob


def scheduler_config(scheduler: SchedulerPort, uow_factory, registry):
    _parsers_config(scheduler, uow_factory, registry)

    scheduler.start()
    scheduler.print_all_jobs()

def _parsers_config(scheduler: SchedulerPort, uow_factory, registry):
    job = ParseCharactersCronJob(uow_factory=uow_factory, registry=registry, website=SourceKey.MHArchive)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_CHARACTER,
            func=job.run,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={"limit": 3}
        )
    )

    job = ParsePetsCronJob(uow_factory=uow_factory, registry=registry, website=SourceKey.MHArchive)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_PET,
            func=job.run,
            trigger="cron",
            hour=14,
            minute=17,
            kwargs={"limit": 3}
        )
    )

    job = ParseSeriesCronJob(uow_factory=uow_factory, registry=registry, source=SourceKey.MHArchive)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_SERIES,
            func=job.run,
            trigger="cron",
            hour=2,
            minute=10,
            kwargs={"limit": 3}
        )
    )

    job = ParseReleasesCronJob(uow_factory=uow_factory, registry=registry, website=SourceKey.MHArchive)
    scheduler.add_job(
        Job(
            id=ParseCronJobIDs.MHARCHIVE_RELEASE,
            func=job.run,
            trigger="cron",
            hour=20,
            minute=49,
            kwargs={"limit": 2}
        )
    )