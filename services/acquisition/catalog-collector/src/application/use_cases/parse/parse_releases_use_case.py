import logging
from typing import Any

from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import ParsedRelease, Source

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_release_port import ParseReleasePort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)


class ParseReleasesUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, site: WebsiteKey, year_start=2025, year_end=2024,  batch_size: int = 10, limit: int = 9999999):
        port: ParseReleasePort = self._r.get(site, ParseReleasePort)
        async for batch in port.parse(year_start=year_start, year_end=year_end, batch_size=batch_size, limit=limit):
            await self._save_batch(site, batch)

    async def _save_batch(self, site: WebsiteKey, batch: list[ParsedRelease]):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: site.value})

        for release in batch:
            if release is None:
                continue

            try:
                if not ("Ghoul" in release.gender_raw or CharacterGender.MANSTER in release.gender_raw):
                    logger.info(f"Skipping release: {release.name} because it is not doll link({release.link})")
                    continue

                release.source_id = source_id
                logger.info(f"Saving release: {release.name} from source-{release.source_id}")
                async with self.uow_factory.create() as uow:
                    await uow.repos.parsed_release.save(release)
                logger.info(f"Successfully saved release: {release.name} from source-{release.source_id}")
            except Exception as e:
                logger.error(f"Failed to save release: {release.name} from {release.source_id}: {e}")
