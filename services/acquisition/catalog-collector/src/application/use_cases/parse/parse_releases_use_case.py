import logging

from monstrino_models.dto import ParsedRelease

from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_release_port import ParseReleasePort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)


class ParseReleasesUseCase:
    def __init__(self,

                 parsed_release_repository: ParsedReleasesRepository,
                 registry: PortsRegistry,
                 ):
        self.parsed_release_repository = parsed_release_repository
        self._r = registry

    async def execute(self, site: WebsiteKey):
        port: ParseReleasePort = self._r.get(site, ParseReleasePort)
        async for batch in port.parse():
            await self._save_batch(batch)

    async def _save_batch(self, batch: list[ParsedRelease]):
        for release in batch:
            try:
                logger.info(
                    f"Saving release: {release.name} from {release.source}")
                await self.parsed_release_repository.save(release)
                logger.info(
                    f"Successfully saved release: {release.name} from {release.source}")
            except Exception as e:
                logger.error(
                    f"Failed to save release: {release.name} from {release.source}: {e}")
