from dataclasses import dataclass
from application.ports.logger_port import LoggerPort
from application.ports.scheduler_port import SchedulerPort

@dataclass
class Adapters:
    scheduler: SchedulerPort
