from monstrino_core.scheduler import SchedulerPort, Job

from domain.entities import ProcessJobs
from domain.enums import ProcessCronJobIDs


def scheduler_config(scheduler: SchedulerPort, process_jobs: ProcessJobs):
    _parsers_config(scheduler, process_jobs)

    scheduler.start()
    scheduler.print_all_jobs()


def _parsers_config(scheduler: SchedulerPort, process_jobs: ProcessJobs):
    ...

