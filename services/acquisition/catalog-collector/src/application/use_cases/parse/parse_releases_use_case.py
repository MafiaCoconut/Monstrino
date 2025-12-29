import logging
import site
import time
from typing import Any
from datetime import datetime

from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import ParsedRelease, Source

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_release_port import ParseReleasePort
from application.registries.ports_registry import PortsRegistry
from domain.entities.parse_scope import ParseScope
from domain.enums.website_key import SourceKey

logger = logging.getLogger(__name__)


class ParseReleasesUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, source: SourceKey, scope: ParseScope, batch_size: int = 10, limit: int = 9999999):
        """
        FLOW:
        1. Get port, parse_scope and source id
        2. Get available release refs from port based on parse scope
        3. For each release ref, check if already parsed in DB
        4. If not parsed, add to links to parse
        5. Parse links to parse in batches
        """

        # Step 1: Get port and source id
        port: ParseReleasePort = self._r.get(source, ParseReleasePort)
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})

        # Step 2
        links_to_parse = []
        async for refs_batch in port.iter_refs(scope=scope):
            ext_ids = [r.external_id for r in refs_batch]
            async with self.uow_factory.create() as uow:
                existing_ids = await uow.repos.parsed_release.get_existed_external_ids_by(
                    year=scope.year,
                    source_id=source_id,
                    external_ids=ext_ids
                )
            new_refs = [r for r in refs_batch if r.external_id not in existing_ids]
            if not new_refs:
                logger.info(f"New releases not found in batch. Skipping batch")
                continue

            links_to_parse.extend(new_refs)

        logger.info(f"Found {len(links_to_parse)} new releases to parse.")

        # Step 3: Parse links in batches
        start_time = time.time()
        async for refs_batch in port.parse_refs(links_to_parse, batch_size=batch_size, limit=limit):
            await self._save_batch(source, refs_batch)
        logger.info(f"Parsing completed in {time.time() - start_time:.2f} seconds.")


    async def execute_parse_all(self, source: SourceKey, year: int = datetime.now().year, batch_size: int = 10, limit: int = 9999999):
        port: ParseReleasePort = self._r.get(source, ParseReleasePort)
        async for batch in port.parse(year=year, batch_size=batch_size, limit=limit):
            await self._save_batch(source, batch)

    async def execute_year_range(self, source: SourceKey, year_start=2025, year_end=2024, batch_size: int = 10, limit: int = 9999999):
        port: ParseReleasePort = self._r.get(site, ParseReleasePort)
        async for batch in port.parse_year_range(year_start=year_start, year_end=year_end, batch_size=batch_size, limit=limit):
            await self._save_batch(source, batch)


    async def _save_batch(self, source: SourceKey, batch: list[ParsedRelease]):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
        if not source_id:
            raise ValueError(f"Source ID not found for source: {source.value}")

        for release in batch:
            if release is None:
                continue

            try:
                logger.info(f"Saving release: {release.name} from sourceID={source_id}")
                release.source_id = source_id
                async with self.uow_factory.create() as uow:
                    if await uow.repos.parsed_release.get_id_by(**{ParsedRelease.SOURCE_ID: source_id, ParsedRelease.EXTERNAL_ID: release.external_id}) is not None:
                        logger.info(f"Skipping release: {release.name} due to release is already parsed")
                    await uow.repos.parsed_release.save(release)
                logger.info(f"Successfully saved release: {release.name} from sourceID={source_id}")
            except Exception as e:
                logger.error(f"Failed to save release: {release.name} from sourceID={source_id}: {e}")
