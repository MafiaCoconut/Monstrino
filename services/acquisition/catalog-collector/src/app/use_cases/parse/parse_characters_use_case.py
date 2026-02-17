import logging
import time
from typing import Any

from monstrino_models.dto import ParsedCharacter, Source

from app.ports.repositories import Repositories
from app.ports.parse.parse_character_port import ParseCharacterPort
from app.registries.ports_registry import PortsRegistry
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey
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

    async def execute(self, source: SourceKey, scope: ParseScope, batch_size: int = 10, limit: int = 9999999):
        port: ParseCharacterPort = self._r.get(source, ParseCharacterPort)
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})

        links_to_parse = []
        async for refs_batch in port.iter_refs(scope=scope):
            ext_ids = [r.external_id for r in refs_batch]
            async with self.uow_factory.create() as uow:
                existing_ids = await uow.repos.parsed_character.get_existed_external_ids_by(
                    source_id=source_id,
                    external_ids=ext_ids
                )
            new_refs = [r for r in refs_batch if r.external_id not in existing_ids]
            if not new_refs:
                logger.debug(f"New characters not found in batch. Skipping batch")
                continue

            links_to_parse.extend(new_refs)

        start_time = time.time()
        logger.info(f"Found {len(links_to_parse)} new characters to parse.")
        async for refs_batch in port.parse_refs(links_to_parse, batch_size, limit):
            await self._save_batch(source=source, batch=refs_batch)
        logger.info(f"Parsing completed in {time.time() - start_time:.2f} seconds.")

    async def execute_parse_all(self, source: SourceKey, batch_size: int = 10, limit: int = 9999999):
        port: ParseCharacterPort = self._r.get(source, ParseCharacterPort)
        await self.execute_ghouls(source=source, port=port, batch_size=batch_size, limit=limit)
        await self.execute_mansters(source=source, port=port, batch_size=batch_size, limit=limit)

    async def execute_ghouls(self, source: SourceKey, port: ParseCharacterPort, batch_size: int, limit: int):
        async for batch in port.parse_ghouls(batch_size=batch_size, limit=limit):
            await self._save_batch(source=source, batch=batch)

    async def execute_mansters(self, source: SourceKey, port: ParseCharacterPort, batch_size: int, limit: int):
        async for batch in port.parse_mansters(batch_size=batch_size, limit=limit):
            await self._save_batch(source=source, batch=batch)

    async def _save_batch(self, source: SourceKey, batch: list[ParsedCharacter]):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
        if not source_id:
            raise ValueError(f"Source ID not found for source: {source.value}")

        for character in batch:
            if character is None:
                continue
            try:
                logger.info(f"Saving character: {character.name} from sourceID={source_id}")
                character.source_id = source_id
                async with self.uow_factory.create() as uow:
                    if await uow.repos.parsed_character.get_id_by(**{ParsedCharacter.SOURCE_ID: source_id, ParsedCharacter.EXTERNAL_ID: character.external_id}) is not None:
                        logger.info(f"Skipping character: {character.name} due to character is already parsed")
                    await uow.repos.parsed_character.save(character)

            except Exception as e:
                logger.error(
                    f"Failed to save character: {character.name} from sourceID={source_id}: {e}")
