from application.ports.scheduler_port import SchedulerPort
# from infrastructure.logging.logs_config import log_decorator


class SetAllSchedulerJobsUseCase:
    def __init__(self,
                 scheduler: SchedulerPort,
                 ):
        self.scheduler = scheduler

    # @log_decorator(print_args=False, print_kwargs=False)
    async def execute(self):
        """
        Функция ставит scheduler работы для всех типов задач
        """

        await self.scheduler.start()
