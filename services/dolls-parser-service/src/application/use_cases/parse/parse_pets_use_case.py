import logging
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_pets_port import ParsePetsPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_pets_repository import ParsedPetsRepository
from domain.entities.parsed_pet_dto import ParsedPetDTO
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)

class ParsePetsUseCase:
    def __init__(self,

                 parsed_pets_repository: ParsedPetsRepository,
                 registry: PortsRegistry,
                 ):
        self.parsed_pets_repository = parsed_pets_repository
        self._r = registry

    async def execute(self, site: WebsiteKey):
        port: ParsePetsPort = self._r.get(site, ParsePetsPort)
        # async for batch in port.parse_ghouls():
        #         await self._save_batch(batch)
        async for batch in port.parse():
                await self._save_batch(batch)


    async def _save_batch(self, batch: list[ParsedPetDTO]):
        for pet in batch:
            try:
                logger.info(f"Saving pet: {pet.display_name} from {pet.link}")
                await self.parsed_pets_repository.save(pet)
            except Exception as e:
                logger.error(e)
                logger.error(f"Failed to save pet: {pet.display_name} from {pet.link}")