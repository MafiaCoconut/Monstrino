from monstrino_contracts.v1.domains.ai.events.contracts.models import AIEventEnvelope
from monstrino_contracts.v1.domains.ai.events.contracts.requests.ai_job_requested import AIJobRequestedPayload
from monstrino_models.dto import AIJob, AIJobIntakeLog


class IntakeUseCase:
    def __init__(self):
        ...

    async def execute(self, payload: AIEventEnvelope):
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
            # source_request_id=payload.
            intake_status=


        )
        ...




