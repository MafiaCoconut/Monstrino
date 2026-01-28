from typing import TypeVar
import logging
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from application.ports import Repositories
from application.use_cases.processing.series import ProcessSeriesSingleUseCase

logger = logging.getLogger(__name__)

TSession = TypeVar("TSession", covariant=True)


class ProcessSeriesBatchUseCase:
    def __init__(
        self,
        uow_factory: UnitOfWorkFactoryInterface[TSession, Repositories],
        single_uc: ProcessSeriesSingleUseCase,
        batch_size: int = 150,
    ):
        self.uow_factory = uow_factory
        self.single_uc = single_uc
        self.batch_size = batch_size

    async def execute(self):
        logger.info("Starting batch processing of series")
        # --- 1. Получаем список ID ---
        async with self.uow_factory.create() as uow:
            ids = await uow.repos.parsed_series.get_unprocessed_record_ids(self.batch_size)

        if not ids:
            return

        # --- 2. Последовательно вызываем SingleUseCase ---
        for id_ in ids:
            try:
                await self.single_uc.execute(parsed_series_id=id_)
            except Exception as e:
                # Batch не падает. Каждую ошибку SingleUC сам обработает в _handle_error.
                logger.error(f"Error during single UC for ID {id_}: {e}")
