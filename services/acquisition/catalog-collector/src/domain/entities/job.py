from datetime import datetime
from typing import List, Any
from typing import Optional, Callable
from pydantic import BaseModel, Field


class Job(BaseModel):
    id:             Optional[str]       = Field(default=None)
    trigger:        str                 = Field(default="cron")
    func:           Callable | str      = Field()
    run_date:       Optional[datetime]  = Field(default=None)
    next_run_time:  Optional[datetime]  = Field(default=None)
    day:            Optional[int]       = Field(default=None)
    hour:           Optional[int]       = Field(default=None)
    minute:         Optional[int]       = Field(default=None)
    day_of_week:    Optional[str]       = Field(default=None)
    args:           list[Any]           = Field(default=[])
    kwargs:         dict[str, Any]      = Field(default={})
    job_type:       Optional[str]       = Field(default=None)


