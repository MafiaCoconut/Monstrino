from typing import Any

from monstrino_contracts.v1.domains.ai.events.contracts.models import AIEventEnvelope
from monstrino_contracts.v1.domains.ai.events.contracts.requests.ai_job_requested import AIJobRequestedPayload
from monstrino_core.ai.ai_job_pipeline.ai_intake import AIJobIntakeStatus
from monstrino_core.kernel import UnitOfWorkFactoryInterface
from monstrino_models.dto import AIJob, AIJobIntakeLog
from monstrino_testing.fixtures import uow_factory, Repositories

from domain.dto import IntakePayload


class IntakeUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
    ):
        self.uow_factory = uow_factory


    async def execute(self, payload: IntakePayload):
        """
        Called by SubscriberUC when new message is read from kafka topic
        - Validates the payload
        - Create AIIntakeLog
        - Create AIJob object
            - Create AITextJob object
            - Create AIImageJob object
        - Create AIJobStatusHistory object with status "created"
        - Create AIJobActionLog object
        """
        intake_log = AIJobIntakeLog(
            event_id=payload.event_id,
            event_type=payload.event_type,
            source_service=payload.source_service,
            # source_request_id=envelope.
            intake_status=AIJobIntakeStatus.PENDING,
        )
        async with self.uow_factory.create() as uow:
            await uow.repos.ai_job_intake_log.add_one(intake_log)

        # if isinstance(envelope.payload, AIJobRequestedPayload):
        #     job_type = envelope.payload

        ai_job = AIJob(
            job_type = payload.job_type,
            source_service=payload.actor_service,
            event_id=payload.event_id,
            correlation_id=payload.actor_correlation_id,
            priority=payload.priority,
        )




