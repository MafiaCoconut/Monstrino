from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from domain.enums import IntakePriority, JobType


class IntakePayload(BaseModel):
    # Job info
    job_type: JobType
    scenario_type: str
    input_context: dict
    output_schema_name: Optional[str] = None


    # Event info
    event_id: UUID
    event_type: str

    # Actor info
    actor_service: str
    actor_correlation_id: UUID
    actor_back_route_key: str

    # Metainfo
    priority: IntakePriority