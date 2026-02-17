import logging
from typing import Any

from monstrino_core.domain.value_objects import CharacterGender
from monstrino_models.dto import ParsedCharacter, Source

from app.ports.repositories import Repositories
from app.ports.parse.parse_character_port import ParseCharacterPort
from app.registries.ports_registry import PortsRegistry
from domain.enums.source_key import SourceKey
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

logger = logging.getLogger(__name__)


class ParseCharacterByExternalIdUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, source: SourceKey, external_id: str, gender: CharacterGender):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
            if not source_id:
                raise ValueError(f"Source ID not found for source: {source.value}")

            if await uow.repos.parsed_character.get_id_by(**{ParsedCharacter.SOURCE_ID: source_id, ParsedCharacter.EXTERNAL_ID: external_id}) is not None:
                logger.info(f"Character with external_id={external_id} from source={source.value} already exists. Skipping parse.")
                return

        port: ParseCharacterPort = self._r.get(source, ParseCharacterPort)

        try:
            parsed_character = await port.parse_by_external_id(external_id, gender)
        except Exception as e:
            logger.error(f"Failed to parse character: {external_id} from source={source.value}: {e}")
            return

        if parsed_character is None:
            logger.error(f"Failed to parse external_id: {external_id}")

        parsed_character.source_id = source_id

        await self._save_result(parsed_character)

    async def _save_result(self, character: ParsedCharacter) -> None:
        try:
            logger.info(f"Saving character: {character.name} from sourceID={character.source_id}")
            async with self.uow_factory.create() as uow:
                await uow.repos.parsed_character.save(character)
        except Exception as e:
            logger.error(f"Failed to save character: {character.name} from sourceID={character.source_id}: {e}")

