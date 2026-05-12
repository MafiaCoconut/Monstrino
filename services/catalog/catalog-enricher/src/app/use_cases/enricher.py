import logging
from datetime import datetime
from typing import Any, Optional
from uuid import UUID

from icecream import ic
from monstrino_contracts.v1.channels.kafka import KafkaTopics
from monstrino_contracts.v1.domains.ai import AIEventEnvelope, AIJobType
from monstrino_contracts.v1.domains.ai.events.contracts.requests import AICharactersEnrichment
from monstrino_contracts.v1.service_maps.service_name import ServiceName
from monstrino_core.ai.ai_job_pipeline import AIEventType
from monstrino_core.catalog.catalog_data_ingestion.shared import IngestItemStepType, IngestItemStepStatus, ReleaseParsedContentRef
from monstrino_core.kernel import UnitOfWorkFactoryInterface, UnitOfWorkInterface
from monstrino_core.kernel.interfaces.kafka.publisher import KafkaPublisherInterface
from monstrino_infra.messaging.kafka import KafkaPublisher
from monstrino_models.dto import IngestItemStep, IngestItem
from monstrino_repositories.base import QuerySpec

from app.ports.repositories import Repositories
from domain.dto.ingest_item.input_ref_json import IngestItemStepInputRefData, IngestItemStepInputRef


logger = logging.getLogger(__name__)


class EnricherUseCase:
    def __init__(
        self,
        uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
        kafka_publisher: KafkaPublisherInterface
    ):
        self.uow_factory = uow_factory
        self.message_publisher = kafka_publisher


    async def execute(self, ingest_item_step_id: Optional[UUID] = None):
        """
        Process single source_discovered_entry
        """
        logger.info(f"Processing single ingest_item_step")
        start_time = datetime.now()
        try:
            await self._execute(ingest_item_step_id)
        except Exception as e:
            logger.error(f"Failed to process single source_discovered_entry: {e}")

        logger.info(f"Processing was completed in {(datetime.now() - start_time).total_seconds()} seconds\n\n")

    async def _execute(self, step_id: Optional[UUID] = None):
        async with self.uow_factory.create() as uow:
            if step_id is None:
                step = await uow.repos.ingest_item_step.claim_one_by(
                    QuerySpec(filters={
                        IngestItemStep.STEP_TYPE: IngestItemStepType.ENRICHMENT,
                        IngestItemStep.STATUS: IngestItemStepStatus.INIT
                    }),
                    claim_field=IngestItemStep.STATUS,
                    # claim_value=IngestItemStepStatus.PENDING
                    claim_value=IngestItemStepStatus.INIT

                )
                if step is None:
                    logger.info(f"No new records to enrich found")
                    return
            else:
                step = await uow.repos.ingest_item_step.claim_one_by_id(
                    step_id,
                    claim_field=IngestItemStep.STATUS,
                    claim_value=IngestItemStepStatus.PENDING
                )
                if step is None:
                    logger.error(f"Record with ID=({step_id}) not found")
                    return

            ingest_item = await uow.repos.ingest_item.get_one_by_id(step.ingest_item_id)
            await self._handle_attributes(uow, ingest_item)

    async def _handle_attributes(
        self,
        uow: UnitOfWorkInterface[Any, Repositories],
        ingest_item: IngestItem,
    ):
        # payload = ingest_item.parsed_payload
        ingest_item_payload = ReleaseParsedContentRef(**ingest_item.parsed_payload)

        log_base = f"MPN: {ingest_item_payload.mpn} | "
        logger.info(f"{log_base}Starting handling attributes")

        logger.info(f"{log_base}Processing characters")
        if ingest_item_payload.characters is not None:
            logger.info(f"{log_base}Characters found: {len(ingest_item_payload.characters)}")
            # FOR FUTURE VERSION, DO NOT USED FOR CURRENT SOURCES
        else:
            logger.info(f"{log_base}Characters not found")
            await self._handle_characters(uow, ingest_item, ingest_item_payload)


    async def _handle_characters(
        self,
        uow: UnitOfWorkInterface[Any, Repositories],
        ingest_item: IngestItem,
        ingest_item_payload: ReleaseParsedContentRef
    ):
        payload =  AICharactersEnrichment(
            title=ingest_item_payload.title,
            description=ingest_item_payload.description,
            content_description=ingest_item_payload.content_description,
        )


        ingest_item_step = IngestItemStep(
            ingest_item_id=ingest_item.id,

            step_type=IngestItemStepType.AI_ENRICHMENT,
            status=IngestItemStepStatus.IN_PROGRESS,

            input_ref_json=IngestItemStepInputRef(
                kind="attribute_enrichment",
                entity="characters",
                data=[
                    IngestItemStepInputRefData(
                        attribute="title",
                        value=payload.title,
                    ),
                    IngestItemStepInputRefData(
                        attribute="description",
                        value=payload.description,
                    ),
                    IngestItemStepInputRefData(
                        attribute="content_description",
                        value=payload.content_description,
                    )
                ]
            ).model_dump(),
        )
        ingest_item_step = await uow.repos.ingest_item_step.add_one(ingest_item_step)

        envelope = AIEventEnvelope(
            event_type=AIEventType.AI_JOB_REQUESTED,

            actor_service=ServiceName.CATALOG_ENRICHER,
            actor_correlation_id=str(ingest_item_step.id),

            payload=payload
        )
        ic(envelope)

        self.message_publisher.publish(
            topic=KafkaTopics.AI_JOB_REQUESTED,
            key=str(ingest_item_step.id),
            value=envelope.model_dump_json()
        )
        self.message_publisher.flush()





