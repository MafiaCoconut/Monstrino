# from datetime import datetime
#
# from application.ports.scheduler_port import SchedulerPort
# from domain.entities.job import Job
#
#
# class SchedulerSetParseJobsUseCase:
#     def __init__(
#             self,
#             scheduler: SchedulerPort
#     ):
#         self.scheduler = scheduler
#
#
#     async def execute(self) -> None:
#         ...
#
#
#     async def _register_parser(self):
#         await self.scheduler.add_job(
#             Job(
#                 id="character_parser_job",
#                 func=,
#                 trigger="cron",
#                 hour=3,
#                 minute=0,
#
#             )
#         )