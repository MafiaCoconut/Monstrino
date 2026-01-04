import logging
import time
from datetime import datetime
from typing import Any

from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedSeries, Source

from application.ports.repositories import Repositories
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.registries.ports_registry import PortsRegistry
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey

logger = logging.getLogger(__name__)

class ParseSeriesUseCase:
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
        1. Get port and source id
        2. Get available series refs from port based on parse scope
        3. For each series ref, check if already parsed in DB
        4. If not parsed, add to urls to parse
        5. Parse urls to parse in batches
        """
        # Step 1
        port: ParseSeriesPort = self._r.get(source, ParseSeriesPort)
        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})

        # Step 2
        urls_to_parse = []
        async for refs_batch in port.iter_refs(scope=scope):
            ext_ids = [r.external_id for r in refs_batch]
            async with self.uow_factory.create() as uow:
                existing_ids = await uow.repos.parsed_series.get_existed_external_ids_by(
                    source_id=source_id,
                    external_ids=ext_ids
                )
            new_refs = [r for r in refs_batch if r.external_id not in existing_ids]
            if not new_refs:
                logger.debug(f"New releases not found in batch. Skipping batch")
                continue

            urls_to_parse.extend(new_refs)

        start_time = time.time()
        logger.info(f"Found {len(urls_to_parse)} new series in batch to parse.")
        async for refs_batch in port.parse_refs(urls_to_parse, batch_size, limit):
            await self._process_batch(source=source, batch=refs_batch)
        logger.info(f"Parsing completed in {time.time() - start_time:.2f} seconds.")

    async def execute_parse_all(self, source: SourceKey, batch_size: int = 10, limit: int = 9999999):
        port: ParseSeriesPort = self._r.get(source, ParseSeriesPort)
        async for batch in port.parse(batch_size=batch_size, limit=limit):
            await self._process_batch(source=source, batch=batch)

    async def _process_batch(self, source: SourceKey, batch: list[list[ParsedSeries]]):
        for series_list in batch:
            list_of_series = await self._save_list(source, series_list)
            if list_of_series:
                await self._process_parent_ids(list_of_series)

    async def _save_list(self, source: SourceKey, series_list: list[ParsedSeries]) -> list[ParsedSeries]:
        series_name = series_list[0].name
        start_time = datetime.now()

        async with self.uow_factory.create() as uow:
            source_id = await uow.repos.source.get_id_by(**{Source.NAME: source.value})
        if not source_id:
            raise ValueError(f"Source ID not found for source: {source.value}")

        logger.info(f"Saving series: {series_name} from {series_list[0].url} and subseries from sourceID={source_id}")
        try:
            async with self.uow_factory.create() as uow:
                if await uow.repos.parsed_series.get_id_by(
                        **{
                            ParsedSeries.SOURCE_ID: source_id,
                            ParsedSeries.EXTERNAL_ID: series_list[0].external_id
                        }
                ) is not None:
                    logger.info(f"Skipping series: {series_list[0].name} due to series is already parsed")
                for series in series_list:
                    series.source_id = source_id
                list_of_series = await uow.repos.parsed_series.save_many(series_list)
        except Exception as e:
            logger.error(f"Failed to save series: {series_name} from {series_list[0].url} from sourceID={source_id}: {e}")

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
