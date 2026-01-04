from dataclasses import dataclass

from monstrino_core.scheduler import SchedulerPort

@dataclass
class Adapters:
    scheduler: SchedulerPort
