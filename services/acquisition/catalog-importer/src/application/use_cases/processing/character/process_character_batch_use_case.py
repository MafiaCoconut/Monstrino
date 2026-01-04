import logging
from typing import Any

from icecream import ic
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.container_components import Repositories
from application.use_cases.processing.character.process_character_single_use_case import ProcessCharacterSingleUseCase

logger = logging.getLogger(__name__)


class ProcessCharacterBatchUseCase:
    """Batch use case for processing multiple characters."""

    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            single_uc: ProcessCharacterSingleUseCase,
            batch_size: int = 150
    ) -> None:
        self.uow_factory = uow_factory
        self.single_uc = single_uc
        self.batch_size = batch_size

    async def execute(self) -> None:
        async with self.uow_factory.create() as uow:
            ids: list[int] = await uow.repos.parsed_character.get_unprocessed_record_ids(self.batch_size)

        if not ids:
            logger.info("No unprocessed records found")
            return

        for char_id in ids:
            try:
                await self.single_uc.execute(char_id)
            except Exception as exc:
                logger.error("Batch error while processing character %s: %s", char_id, exc)
