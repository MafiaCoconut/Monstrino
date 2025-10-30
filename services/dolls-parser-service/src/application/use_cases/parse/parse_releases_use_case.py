import logging
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_releases_port import ParseReleasesPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_releases_repository import ParsedReleasesRepository
from domain.entities.parsed_release_dto import ParsedReleaseDTO
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)

class ParseReleasesUseCase:
    def __init__(self,

                 parsed_releases_repository: ParsedReleasesRepository,
                 registry: PortsRegistry,
                 ):
        self.parsed_releases_repository = parsed_releases_repository
        self._r = registry

    async def execute(self, site: WebsiteKey):
        port: ParseReleasesPort = self._r.get(site, ParseReleasesPort)
        # await port.parse()
        async for batch in port.parse():
                await self._save_batch(batch)


    async def _save_batch(self, batch: list[ParsedReleaseDTO]):
        for release in batch:
            try:
                logger.info(f"Saving release: {release.name} from {release.link}")
                await self.parsed_releases_repository.save(release)
            except Exception as e:
                logger.error(e)
                logger.error(f"Failed to save release: {release.name} from {release.link}")