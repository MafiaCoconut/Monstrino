from datetime import datetime
from typing import Any, Optional
from uuid import UUID
import logging

from icecream import ic
from monstrino_core.catalog.catalog_data_ingestion.shared import IngestItemStepType, IngestItemStepStatus, ReleaseParsedContentRef
from monstrino_core.kernel import UnitOfWorkFactoryInterface, UnitOfWorkInterface
from monstrino_infra.debug import ic_model
from monstrino_models.dto import IngestItemStep, IngestItem
from monstrino_repositories.base import QuerySpec

from app.ports.repositories import Repositories

logger = logging.getLogger(__name__)


class EnricherUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
    ):
        self.uow_factory = uow_factory


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


    async def _handle_attributes(self, uow: UnitOfWorkInterface[Any, Repositories], payload: ReleaseParsedContentRef):
        log_base = f"MPN: {payload.mpn} | "
        logger.info(f"{log_base}Starting handling attributes")

        logger.info(f"{log_base}Processing characters")
        if payload.characters is not None:
            logger.info(f"{log_base}Characters found: {len(payload.characters)}")
            # FOR FUTURE VERSION, DO NOT USED FOR CURRENT SOURCES
        else:
            logger.info(f"{log_base}Characters not found")
            # ingest_item_step = IngestItemStep(
            #     step_type=IngestItemStepType.AI_ENRICHMENT
            # )



