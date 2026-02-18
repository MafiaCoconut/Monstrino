import asyncio
import logging
from typing import Any
from uuid import UUID
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_testing.fixtures import Repositories

from app.use_cases.processing.pet.process_pet_single_use_case import ProcessPetSingleUseCase

logger = logging.getLogger(__name__)


class ProcessPetBatchUseCase:
    """Batch use case for processing multiple pets."""

    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any , Repositories],
            single_uc: ProcessPetSingleUseCase,
            batch_size: int = 150
    ) -> None:
        self.uow_factory = uow_factory
        self.single_uc = single_uc
        self.batch_size = batch_size

    async def execute(self) -> None:
        logger.info("Starting batch processing of pets")
        async with self.uow_factory.create() as uow:
            ids: list[UUID] = await uow.repos.parsed_pet.get_unprocessed_record_ids(self.batch_size)

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

        # for pet_id in ids:
        #     try:
        #         await self.single_uc.execute(pet_id)
        #     except Exception as exc:  # noqa: BLE001
        #         logger.error("Batch error while processing pet %s: %s", pet_id, exc)
