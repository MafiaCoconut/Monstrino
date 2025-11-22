import logging
from typing import TypeVar, Any

from icecream import ic
from monstrino_core import SeriesTypes, NameFormatter, ProcessingStates, ParentSeriesNotFoundError
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Series
from monstrino_models.dto import ParsedSeries
from monstrino_core.exceptions import EntityNotFoundError
from monstrino_models.enums import EntityName

from app.container_components import Repositories
from application.services.common import SeriesProcessingStatesService, ImageReferenceService
from application.services.series.parent_resolver_svc import ParentResolverService

logger = logging.getLogger(__name__)


class ProcessSeriesSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            parent_resolver_svc: ParentResolverService,
            processing_states_svc: SeriesProcessingStatesService,
            image_reference_svc: ImageReferenceService,
    ):
        self.uow_factory = uow_factory
        self.parent_resolver_svc = parent_resolver_svc
        self.processing_states_svc = processing_states_svc
        self.image_reference_svc = image_reference_svc


    """
    1. Take parsed series
    2. Format name
    3. If series is secondary, resolve parent
    4. Save series
    5. Set image to process
    6. Mark parsed series as processed
    7. If any error occurs, mark parsed series as with_errors
    """

    async def execute(self, parsed_series_id: int):
            try:
                async with self.uow_factory.create() as uow:
                    parsed_series = await uow.repos.parsed_series.get_unprocessed_record_by_id(parsed_series_id)
                    if not parsed_series:
                        raise EntityNotFoundError

                    series = Series(
                        name=NameFormatter.format_name(parsed_series.name),
                        display_name=parsed_series.name,
                        series_type=parsed_series.series_type,
                        description=parsed_series.description,
                        primary_image=parsed_series.primary_image,
                    )

                    if series.series_type == SeriesTypes.SECONDARY:
                        await self.parent_resolver_svc.resolve(uow, parsed_series, series)

                    series = await uow.repos.series.save(series)

                    await self.image_reference_svc.set_image_to_process(
                        uow,
                        EntityName.SERIES,
                        Series.PRIMARY_IMAGE,
                        parsed_series.primary_image,
                        series.id
                    )


                    await self.processing_states_svc.set_processed(uow, parsed_series_id)
                    await uow.repos.parsed_series.set_processing_state(parsed_series.id, ProcessingStates.PROCESSED)
            except EntityNotFoundError as e:
                logger.error(f"Error processing series ID {parsed_series_id}: {e}")
                await self._handle_error(parsed_series_id)
            except ParentSeriesNotFoundError:
                logger.error(f"Subseries ID {parsed_series_id} has no valid parent")
                await self._handle_error(parsed_series_id)
            except Exception as e:
                logger.error(f"Unexpected error during processing series ID {parsed_series_id}: {e}")
                await self._handle_error(parsed_series_id)

    async def _handle_error(self, parsed_series_id: int):
        async with self.uow_factory.create() as uow:
            await self.processing_states_svc.set_with_errors(uow, parsed_series_id)
