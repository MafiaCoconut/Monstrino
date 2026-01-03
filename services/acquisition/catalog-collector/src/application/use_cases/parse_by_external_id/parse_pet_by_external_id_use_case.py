import logging
import time
from typing import Any

from icecream import ic
from monstrino_models.dto import Source, ParsedPet

from bootstrap.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse import ParsePetPort
from application.registries.ports_registry import PortsRegistry
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

logger = logging.getLogger(__name__)


class ParsePetByExternalIdUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, source: SourceKey, external_id: str):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
            if not source_id:
                raise ValueError(f"Source ID not found for source: {source.value}")

            if await uow.repos.parsed_pet.get_id_by(**{ParsedPet.SOURCE_ID: source_id, ParsedPet.EXTERNAL_ID: external_id}) is not None:
                logger.info(f"Pet with external_id={external_id} from sourceID={source.value} already exists. Skipping parse.")
                return

        port: ParsePetPort = self._r.get(source, ParsePetPort)

        try:
            parsed_pet = await port.parse_by_external_id(external_id)
        except Exception as e:
            logger.error(f"Failed to parse pet: {external_id} from sourceID={source.value}: {e}")
            return

        parsed_pet.source_id = source_id
        if parsed_pet is None:
            logger.error(f"Failed to parse link: {external_id}")

        await self._save_result(parsed_pet)

    async def _save_result(self, pet: ParsedPet) -> None:
        try:
            logger.info(f"Saving pet: {pet.name} from sourceID={pet.source_id}")
            async with self.uow_factory.create() as uow:
                await uow.repos.parsed_pet.save(pet)
        except Exception as e:
            logger.error(f"Failed to save pet: {pet.name} from sourceID={pet.source_id}: {e}")

