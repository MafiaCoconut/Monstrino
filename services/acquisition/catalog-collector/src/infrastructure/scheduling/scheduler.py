from icecream import ic

from application.ports.scheduler_port import SchedulerPort
from domain.entities.job import Job
from domain.enums.website_key import WebsiteKey
from infrastructure.scheduling.jobs.parse_characters_job import ParseCharactersCronJob


def scheduler_config(scheduler: SchedulerPort, uow_factory, registry):
    _parsers_config(scheduler, uow_factory, registry)

    scheduler.start()
    ic(scheduler.get_all_jobs())


def _parsers_config(scheduler: SchedulerPort, uow_factory, registry):
    job = ParseCharactersCronJob(uow_factory=uow_factory, registry=registry, website=WebsiteKey.MHArchive)
    scheduler.add_job(
        Job(
            id="parse_characters_mharchive_cron_job",
            func=job.run,
            trigger="cron",
            hour=2,
            minute=10,
        )
    )