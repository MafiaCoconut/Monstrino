
import logging

logger = logging.getLogger(__name__)


class ProcessReleasesBatchUseCase:
    """Batch use case for processing multiple releases."""

    def __init__(self, uow_factory, single_uc, batch_size: int = 100) -> None:
        self.uow_factory = uow_factory
        self.single_uc = single_uc
        self.batch_size = batch_size

    async def execute(self) -> None:
        async with self.uow_factory.create() as uow:
            ids: list[int] = await uow.repos.parsed_releases.get_unprocessed_ids(self.batch_size)

        if not ids:
            return

        for rel_id in ids:
            try:
                await self.single_uc.execute(rel_id)
            except Exception as exc:  # noqa: BLE001
                logger.error("Batch error while processing release %s: %s", rel_id, exc)
