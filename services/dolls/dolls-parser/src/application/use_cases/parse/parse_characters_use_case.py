import logging

from monstrino_models.dto import ParsedCharacter

from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_characters_repository import ParsedCharactersRepository
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)

class ParseCharactersUseCase:
    def __init__(self,
                 parsed_characters_repository: ParsedCharactersRepository,
                 registry: PortsRegistry,
                 ):
        self.parsed_characters_repository = parsed_characters_repository
        self._r = registry

    async def execute(self, site: WebsiteKey):
        port: ParseCharactersPort = self._r.get(site, ParseCharactersPort)
        async for batch in port.parse_ghouls():
                await self._save_batch(batch)
        async for batch in port.parse_mansters():
                await self._save_batch(batch)


    async def _save_batch(self, batch: list[ParsedCharacter]):
        for character in batch:
            try:
                logger.info(f"Saving character: {character.name}")
                await self.parsed_characters_repository.save(character)
            except Exception as e:
                logger.error(f"Failed to save character: {character.name}: {e}")