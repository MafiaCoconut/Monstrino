import logging
from typing import Any

from monstrino_models.dto import ParsedCharacter

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_character_port import ParseCharacterPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

logger = logging.getLogger(__name__)


class ParseCharactersUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, site: WebsiteKey, batch_size: int = 10, limit: int = 9999999):
        port: ParseCharacterPort = self._r.get(site, ParseCharacterPort)
        # async for batch in port.parse_ghouls(batch_size=batch_size, limit=limit):
        #     await self._save_batch(batch)
        async for batch in port.parse_mansters(batch_size=batch_size, limit=limit):
            await self._save_batch(batch)

    async def _save_batch(self, batch: list[ParsedCharacter]):
        for character in batch:
            try:
                logger.info(f"Saving character: {character.name}")
                async with self.uow_factory.create() as uow:
                    await uow.repos.parsed_character.save(character)
            except Exception as e:
                logger.error(
                    f"Failed to save character: {character.name}: {e}")
