from application.ports.scheduler_port import SchedulerPort
from infrastructure.logging.logs_config import log_decorator


class SetAllSchedulerJobsUseCase:
    def __init__(self,
                 scheduler: SchedulerPort,
                 ):
        self.scheduler = scheduler

    @log_decorator(print_args=False, print_kwargs=False)
    async def execute(self):
        await self.scheduler.start()
