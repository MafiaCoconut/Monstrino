import logging
import time
from typing import Any

from icecream import ic
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import Source, ParsedSeries

from app.container_components.repositories import Repositories
from application.ports.logger_port import LoggerPort
from application.ports.parse import ParseSeriesPort
from application.registries.ports_registry import PortsRegistry
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

logger = logging.getLogger(__name__)


class ParseSeriesByExternalIdUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            registry: PortsRegistry,
    ):
        self.uow_factory = uow_factory
        self._r = registry

    async def execute(self, source: SourceKey, external_id: str):
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
            if not source_id:
                raise ValueError(f"Source ID not found for source: {source.value}")

            if await uow.repos.parsed_series.get_id_by(**{ParsedSeries.SOURCE_ID: source_id, ParsedSeries.EXTERNAL_ID: external_id}) is not None:
                return

        port: ParseSeriesPort = self._r.get(source, ParseSeriesPort)

        try:
            parsed_series_list = await port.parse_by_external_id(external_id)
        except Exception as e:
            logger.error(f"Failed to parse series: {external_id} from sourceID={source.value}: {e}")
            return

        if parsed_series_list is None:
            logger.error(f"Failed to parse link: {external_id}")
            return

        for parsed_series in parsed_series_list:
            parsed_series.source_id = source_id

        await self._process_batch(parsed_series_list)

    async def _process_batch(self, series_list: list[ParsedSeries]):
        list_of_series = await self._save_result(series_list)
        await self._process_parent_ids(list_of_series)

    async def _save_result(self, parsed_series_list: list[ParsedSeries]) -> list[ParsedSeries]:
        series_prime = parsed_series_list[0]
        try:
            logger.info(f"Saving series: {series_prime.name} from sourceID={series_prime.source_id}")
            async with self.uow_factory.create() as uow:
                return await uow.repos.parsed_series.save_many(parsed_series_list)
        except Exception as e:
            logger.error(f"Failed to save series: {series_prime.name} from sourceID={series_prime.source_id}: {e}")


    async def _process_parent_ids(self, series_list: list[ParsedSeries]):
        async with self.uow_factory.create() as uow:
            for series in series_list:
                if series.parent_name and not series.parent_id:
                    try:
                        parent_series = await uow.repos.parsed_series.get_one_by(**{ParsedSeries.NAME: series.parent_name})
                        if parent_series:
                            series.parent_id = parent_series.id
                            logger.info(f"Set parent_id for series {series.name} to ParentID={series.parent_id}")
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
