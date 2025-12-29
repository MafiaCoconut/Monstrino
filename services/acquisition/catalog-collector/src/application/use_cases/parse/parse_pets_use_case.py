import logging
import time
from typing import Any

from icecream import ic
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import ParsedPet, Source
from monstrino_testing.fixtures import uow_factory

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_pet_port import ParsePetPort
from application.registries.ports_registry import PortsRegistry
from monstrino_repositories.repositories_interfaces import ParsedPetRepoInterface

from domain.entities.parse_scope import ParseScope
from domain.enums.website_key import SourceKey

logger = logging.getLogger(__name__)


class ParsePetsUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, source: SourceKey, scope: ParseScope, batch_size: int = 10, limit: int = 9999999):
        port: ParsePetPort = self._r.get(source, ParsePetPort)
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})

        links_to_parse = []
        async for refs_batch in port.iter_refs(scope=scope):
            ext_ids = [r.external_id for r in refs_batch]
            async with self.uow_factory.create() as uow:
                existing_ids = await uow.repos.parsed_pet.get_existed_external_ids_by(
                    source_id=source_id,
                    external_ids=ext_ids
                )
            new_refs = [r for r in refs_batch if r.external_id not in existing_ids]
            if not new_refs:
                logger.info(f"New pets not found in batch. Skipping batch")
                continue

            links_to_parse.extend(new_refs)

        start_time = time.time()
        logger.info(f"Found {len(links_to_parse)} new pets to parse.")
        async for refs_batch in port.parse_refs(links_to_parse, batch_size, limit):
            await self._save_batch(source=source, batch=refs_batch)
        logger.info(f"Parsing completed in {time.time() - start_time:.2f} seconds.")

    async def _save_batch(self, source: SourceKey, batch: list[ParsedPet]):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
        if not source_id:
            raise ValueError(f"Source ID not found for source: {source.value}")

        for pet in batch:
            try:
                logger.info(f"Saving pet: {pet.name} from sourceID={source_id}")
                pet.source_id=source_id
                async with self.uow_factory.create() as uow:
                    if await uow.repos.parsed_pet.get_id_by(**{ParsedPet.LINK: pet.link}) is not None:
                        logger.info(f"Skipping pet: {pet.name} due to pet is already parsed")
                    await uow.repos.parsed_pet.save(pet)
            except Exception as e:
                logger.error(
                    f"Failed to save pet: {pet.name} from sourceID={source_id}: {e}")
