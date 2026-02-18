import asyncio
import logging
from typing import Any
from uuid import UUID
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from app.ports import Repositories
from app.use_cases.processing.releases.process_release_single_use_case import ProcessReleaseSingleUseCase

logger = logging.getLogger(__name__)


class ProcessReleasesBatchUseCase:
    """Batch use case for processing multiple releases."""

    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any , Repositories],
            single_uc: ProcessReleaseSingleUseCase,
            batch_size: int = 150
    ) -> None:
        self.uow_factory = uow_factory
        self.single_uc = single_uc
        self.batch_size = batch_size
        self.batch_size = 1

    async def execute(self) -> None:
        logger.info("Starting batch processing of releases")
        async with self.uow_factory.create() as uow:
            ids: list[UUID] = await uow.repos.parsed_release.get_unprocessed_record_ids(self.batch_size)
        if not ids:
            return

        batch_size = 10
        total = len(ids)
        for i in range(0, total, batch_size):
            end = min(i + batch_size, total)

            logger.info(f"Parsing batch: {i}-{end}")
            batch = ids[i:end]

            tasks = [self.single_uc.execute(p) for p in batch]
            await asyncio.gather(*tasks, return_exceptions=True)

        # for rel_id in ids:
        #     try:
        #         await self.single_uc.execute(rel_id)
        #     except Exception as exc:
        #         logger.error("Batch error while processing release %s: %s", rel_id, exc)
