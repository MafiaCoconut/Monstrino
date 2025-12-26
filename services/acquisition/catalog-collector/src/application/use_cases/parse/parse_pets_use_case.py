import logging
from typing import Any

from icecream import ic
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import ParsedPet
from monstrino_testing.fixtures import uow_factory

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_pet_port import ParsePetPort
from application.registries.ports_registry import PortsRegistry
from monstrino_repositories.repositories_interfaces import ParsedPetRepoInterface

from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)


class ParsePetsUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, site: WebsiteKey, batch_size: int = 10, limit: int = 9999999):
        port: ParsePetPort = self._r.get(site, ParsePetPort)
        async for batch in port.parse(batch_size=batch_size, limit=limit):
            await self._save_batch(batch)

    async def _save_batch(self, batch: list[ParsedPet]):
        for pet in batch:
            try:
                logger.info(f"Saving pet: {pet.name} from {pet.source}")
                async with self.uow_factory.create() as uow:
                    await uow.repos.parsed_pet.save(pet)
            except Exception as e:
                logger.error(
                    f"Failed to save pet: {pet.name} from {pet.source}: {e}")
