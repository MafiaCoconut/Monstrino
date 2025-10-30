import logging
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_series_repository import ParsedSeriesRepository
from domain.entities.parsed_series_dto import ParsedSeriesDTO
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)

class ParseSeriesUseCase:
    def __init__(self,

                 parsed_series_repository: ParsedSeriesRepository,
                 registry: PortsRegistry,
                 ):
        self.parsed_series_repository = parsed_series_repository
        self._r = registry

    async def execute(self, site: WebsiteKey):
        port: ParseSeriesPort = self._r.get(site, ParseSeriesPort)
        # await port.parse()
        async for batch in port.parse():
                await self._save_batch(batch)


    async def _save_batch(self, batch: list[ParsedSeriesDTO]):
        for series in batch:
            try:
                logger.info(f"Saving series: {series.display_name} from {series.link}")
                await self.parsed_series_repository.save(series)
            except Exception as e:
                logger.error(e)
                logger.error(f"Failed to save series: {series.display_name} from {series.link}")