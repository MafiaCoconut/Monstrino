import logging

from monstrino_models.dto import ParsedPet

from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_pets_port import ParsePetsPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_pet_repository import ParsedPetRepository
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)


class ParsePetsUseCase:
    def __init__(self,

                 parsed_pet_repository: ParsedPetRepository,
                 registry: PortsRegistry,
                 ):
        self.parsed_pet_repository = parsed_pet_repository
        self._r = registry

    async def execute(self, site: WebsiteKey):
        port: ParsePetsPort = self._r.get(site, ParsePetsPort)
        async for batch in port.parse():
            await self._save_batch(batch)

    async def _save_batch(self, batch: list[ParsedPet]):
        for pet in batch:
            try:
                logger.info(f"Saving pet: {pet.name} from {pet.source}")
                await self.parsed_pet_repository.save(pet)
            except Exception as e:
                logger.error(
                    f"Failed to save pet: {pet.name} from {pet.source}: {e}")
