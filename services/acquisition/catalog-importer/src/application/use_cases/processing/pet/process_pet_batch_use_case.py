import logging
from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_testing.fixtures import Repositories

from application.use_cases.processing.pet.process_pet_single_use_case import ProcessPetSingleUseCase

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
        async with self.uow_factory.create() as uow:
            ids: list[int] = await uow.repos.parsed_pet.get_unprocessed_record_ids(self.batch_size)

        if not ids:
            return

        for pet_id in ids:
            try:
                await self.single_uc.execute(pet_id)
            except Exception as exc:  # noqa: BLE001
                logger.error("Batch error while processing pet %s: %s", pet_id, exc)
