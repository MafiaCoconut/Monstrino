import logging
from typing import Any

from monstrino_models.dto import Source, ParsedRelease

from app.ports.repositories import Repositories
from app.ports.parse import ParseReleasePort
from app.registries.ports_registry import PortsRegistry
from domain.enums.source_key import SourceKey
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

logger = logging.getLogger(__name__)


class ParseReleaseByExternalIdUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, source: SourceKey, external_id: str):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.TITLE: source.value})
            if not source_id:
                raise ValueError(f"Source ID not found for source: {source.value}")

            if await uow.repos.parsed_release.get_id_by(**{ParsedRelease.SOURCE_ID: source_id, ParsedRelease.EXTERNAL_ID: external_id}) is not None:
                return

        port: ParseReleasePort = self._r.get(source, ParseReleasePort)

        try:
            parsed_release = await port.parse_by_external_id(external_id)
        except Exception as e:
            logger.exception(f"Failed to parse release: {external_id} from source={source.value}: {e}")
            return

        parsed_release.source_id = source_id
        if parsed_release is None:
            logger.error(f"Failed to parse link: {external_id}")

        await self._save_result(parsed_release)

    async def _save_result(self, release: ParsedRelease) -> None:
        try:
            logger.info(f"Saving release: {release.title} from sourceID={release.source_id}")
            async with self.uow_factory.create() as uow:
                await uow.repos.parsed_release.save(release)
        except Exception as e:
            logger.error(f"Failed to save release: {release.title} from sourceID={release.source_id}: {e}")

