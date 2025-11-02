import logging
from datetime import datetime

from icecream import ic
from monstrino_models.dto import ParsedSeries

from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_series_repository import ParsedSeriesRepository
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
        async for batch in port.parse():
            await self._save_batch(batch)
            await self._process_parent_ids(batch)


    async def _save_batch(self, batch: list[ParsedSeries]):
        for series in batch:
            start_time = datetime.now()

            try:
                logger.info(f"Saving series: {series.name} from {series.link}")
                await self.parsed_series_repository.save(series)
            except Exception as e:
                logger.error(f"Failed to save series: {series.name} from {series.link}: {e}")
            end_time = datetime.now()
            logger.info(
                f"Series saving process: {series.name} in {(end_time - start_time).total_seconds()} seconds")



    async def _process_parent_ids(self, batch: list[ParsedSeries]):
        for series in batch:
            if series.parent_name and not series.parent_id:
                try:
                    parent_series = await self.parsed_series_repository.get_parent_series(series.parent_name)
                    if parent_series:
                        series.parent_id = parent_series.id
                        logger.info(f"Set parent_id for series {series.name} to {series.parent_id}")
                        await self._set_parent_id(series)
                except Exception as e:
                    logger.error(f"Failed to set parent_id for series {series.name}: {e}")

    async def _set_parent_id(self, parsed_series: ParsedSeries):
        try:
            await self.parsed_series_repository.set_parent_id(parsed_series)
        except Exception as e:
            logger.error(f"Failed to set parent_id for series {parsed_series.name}: {e}")
            logger.error(f"Deleting parsed series {parsed_series.name} due to error")
            try:
                await self.parsed_series_repository.remove_by_parent_id_error(parsed_series)
            except Exception as delete_error:
                logger.error(f"Failed to delete parsed series {parsed_series.name}: {delete_error}")
