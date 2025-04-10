from application.interfaces.scheduler_interface import SchedulerInterface
from infrastructure.config.logs_config import log_decorator


class SetAllSchedulerJobsUseCase:
    def __init__(self,
                 scheduler_interface: SchedulerInterface,
                 ):
        self.scheduler_interface = scheduler_interface

    @log_decorator(print_args=False, print_kwargs=False)
    async def execute(self):
        """
        Функция ставит scheduler работы для всех типов задач
        """

        await self.scheduler_interface.start()
