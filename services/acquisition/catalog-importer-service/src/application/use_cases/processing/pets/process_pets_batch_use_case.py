
import logging

logger = logging.getLogger(__name__)


class ProcessPetsBatchUseCase:
    """Batch use case for processing multiple pets."""

    def __init__(self, uow_factory, single_uc, batch_size: int = 150) -> None:
        self.uow_factory = uow_factory
        self.single_uc = single_uc
        self.batch_size = batch_size

    async def execute(self) -> None:
        async with self.uow_factory.create() as uow:
            ids: list[int] = await uow.repos.parsed_pets.get_unprocessed_ids(self.batch_size)

        if not ids:
            return

        for pet_id in ids:
            try:
                await self.single_uc.execute(pet_id)
            except Exception as exc:  # noqa: BLE001
                logger.error("Batch error while processing pet %s: %s", pet_id, exc)
