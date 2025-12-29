from datetime import datetime
from typing import List, Any, Optional
import logging
from tabulate import tabulate
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.job import Job as ApsJob

from application.ports.scheduler_port import SchedulerPort
from domain.entities.job import Job

logger = logging.getLogger(__name__)

class SchedulerAdapter(SchedulerPort):
    def __init__(self, scheduler: AsyncIOScheduler):
        self.scheduler = scheduler

    def start(self) -> None:
        self.scheduler.start()

    def add_job(self, job: Job) -> None:
        self.scheduler.add_job(
            func=job.func,
            trigger=job.trigger,
            day=job.day,
            hour=job.hour,
            minute=job.minute,
            args=job.args,
            kwargs=job.kwargs,
            id=job.id,
        )

    def remove_job(self, job_id: str) -> None:
        self.scheduler.remove_job(job_id)

    def resume_job(self, job_id: str) -> None:
        self.scheduler.resume_job(job_id)

    def trigger_job(self, job_id: str) -> None:
        self.scheduler.modify_job(job_id, next_run_time=datetime.now())

    def get_job(self, job_id: str) -> Optional[Job]:
        return self._job_to_dto(self.scheduler.get_job(job_id))

    def get_all_jobs(self) -> List[str]:
        jobs = self.scheduler.get_jobs()
        return [f"{job.id} - {job.next_run_time}" for job in jobs]

    def print_all_jobs(self):
        jobs = list(self.scheduler.get_jobs())

        def sort_key(j):
            nrt = getattr(j, "next_run_time", None)
            return (nrt is None, nrt or datetime.max)

        jobs.sort(key=sort_key)

        rows: list[list[str]] = []
        for j in jobs:
            # APScheduler Job has these attrs in v3; v4 keeps very similar shape.
            rows.append([
                str(getattr(j, "id", "")),
                self._fmt_dt(getattr(j, "next_run_time", None)),
                str(getattr(j, "trigger", "")),
                self._short(getattr(j, "func_ref", None) or getattr(j, "func", None)),
                self._short(getattr(j, "args", ())),
                self._short(getattr(j, "kwargs", {})),
                # ",".join(getattr(j, "misfire_grace_time", []) or []) if isinstance(
                #     getattr(j, "misfire_grace_time", None), list) else str(getattr(j, "misfire_grace_time", "")),
                # str(getattr(j, "max_instances", "")),
                # str(getattr(j, "coalesce", "")),
            ])

        headers = ["id", "next_run", "trigger", "func", "args", "kwargs", "misfire_grace", "max_inst", "coalesce"]

        if tabulate:
            logger.info('\n'+ tabulate(rows, headers=headers, tablefmt="rounded_grid"))
        else:
            # Fallback: simple aligned columns
            col_widths = [len(h) for h in headers]
            for r in rows:
                for i, cell in enumerate(r):
                    col_widths[i] = max(col_widths[i], len(cell))

            def fmt_row(r):
                return " | ".join(cell.ljust(col_widths[i]) for i, cell in enumerate(r))

            print(fmt_row(headers))
            print("-+-".join("-" * w for w in col_widths))
            for r in rows:
                print(fmt_row(r))

    def _fmt_dt(self, dt: datetime | None) -> str:
        if dt is None:
            return "—"
        # APScheduler stores aware datetimes typically; isoformat keeps tz info.
        return dt.isoformat(sep=" ", timespec="seconds")


    def _short(self, obj: Any, max_len: int = 80) -> str:
        s = repr(obj)
        return s if len(s) <= max_len else (s[: max_len - 1] + "…")

    def _job_to_dto(self, job: ApsJob) -> Job:
        return Job(
            id=job.id,
            trigger=str(getattr(job, "trigger", "")),
            func=getattr(job, "func_ref", None),
            next_run_time=getattr(job, "next_run_time", None),
            args=list(getattr(job, "args", ()) or ()),
            kwargs=dict(getattr(job, "kwargs", {}) or {}),
        )
