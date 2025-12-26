import logging
from datetime import datetime
from typing import Any

from icecream import ic
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedSeries
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey

logger = logging.getLogger(__name__)

class ParseSeriesUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, site: WebsiteKey, batch_size: int = 10, limit: int = 9999999):
        port: ParseSeriesPort = self._r.get(site, ParseSeriesPort)
        async for batch in port.parse(batch_size=batch_size, limit=limit):
            for series_list in batch:
                list_of_series = await self._save_list(series_list)
                ic(list_of_series)
                await self._process_parent_ids(list_of_series)

    async def _save_list(self, series_list: list[ParsedSeries]) -> list[ParsedSeries]:
        series_name = series_list[0].name
        start_time = datetime.now()

        logger.info(f"Saving series: {series_name} from {series_list[0].link} and subseries")
        try:
            async with self.uow_factory.create() as uow:
                list_of_series = await uow.repos.parsed_series.save_many(series_list)
        except Exception as e:
            logger.error(f"Failed to save series: {series_name} from {series_list[0].link}: {e}")

        end_time = datetime.now()
        logger.info(f"Series saving process: {series_name} in {(end_time - start_time).total_seconds()} seconds")
        return list_of_series

    async def _process_parent_ids(self, series_list: list[ParsedSeries]):
        async with self.uow_factory.create() as uow:
            for series in series_list:
                if series.parent_name and not series.parent_id:
                    try:
                        parent_series = await uow.repos.parsed_series.get_one_by(**{ParsedSeries.NAME: series.parent_name})
                        if parent_series:
                            series.parent_id = parent_series.id
                            logger.info(f"Set parent_id for series {series.name} to {series.parent_id}")
                            await self._set_parent_id(uow, series)
                    except Exception as e:
                        logger.error(f"Failed to set parent_id for series {series.name}: {e}")

    async def _set_parent_id(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_series: ParsedSeries):
        try:
            await uow.repos.parsed_series.update(filters={ParsedSeries.ID: parsed_series.id}, values={ParsedSeries.PARENT_ID: parsed_series.parent_id})
        except Exception as e:
            logger.error(f"Failed to set parent_id for series {parsed_series.name}: {e}")
            logger.error(f"Deleting parsed series {parsed_series.name} due to error")
            try:
                await uow.repos.parsed_series.update(filters={ParsedSeries.ID: parsed_series.id}, values={ParsedSeries.processing_state: ProcessingStates.WITH_ERRORS})
            except Exception as delete_error:
                logger.error(f"Failed to delete parsed series {parsed_series.name}: {delete_error}")
