import logging

from icecream import ic
from monstrino_models.dto import ParsedImage
from monstrino_models.dto import ParsedSeries
from monstrino_models.exceptions import EntityNotFound, DBConnectionError

from monstrino_repositories.repositories import (
    ParsedSeriesRepo, SeriesRepo, ParsedImagesRepo, ImageReferenceOriginRepo
)
from domain.formatters.name_formatter import NameFormatter

logger = logging.getLogger(__name__)


class ProcessSeriesUseCase:
    def __init__(self,
                 parsed_series_repo: ParsedSeriesRepo,
                 release_series_repo: SeriesRepo,
                 parsed_images_repo: ParsedImagesRepo,
                 image_reference_origin_repo: ImageReferenceOriginRepo

                 ):
        self.parsed_series_repo = parsed_series_repo
        self.release_series_repo = release_series_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo

    async def execute(self):
        try:
            unprocessed_series_many = await self._get_unprocessed_series(200)
        except Exception as e:
            logger.error(f"Unexpected error during fetching unprocessed series: {e}")
            return

        if not unprocessed_series_many:
            return

        logger.info(f"============== Starting processing of {len(unprocessed_series_many)} series ==============")
        for i, unprocessed_series in enumerate(unprocessed_series_many):
            try:
                logger.info(f"Processing series {unprocessed_series.name} (ID: {unprocessed_series.id})")

                logger.info(f"Processing name for series {unprocessed_series.name} (ID: {unprocessed_series.id})")
                await self._process_name(unprocessed_series)

                if unprocessed_series.series_type == "series_secondary":
                    logger.info(
                        f"Setting parent ID for secondary series {unprocessed_series.name} (ID: {unprocessed_series.id})")
                    await self._set_parent_id(unprocessed_series)
                try:
                    logger.info(f"Saving series {unprocessed_series.name} (ID: {unprocessed_series.id})")
                    series = await self.release_series_repo.save_unprocessed_series(unprocessed_series)
                    logger.info(f"Series {unprocessed_series.name} saved (ID: {unprocessed_series.id})")

                except Exception as e:
                    logger.error(f"Error by saving series {unprocessed_series.name} (ID: {unprocessed_series.id}): {e}")
                    continue

                try:

                    logger.info(f"Setting image to process for series {unprocessed_series.id}")
                    await self._set_image_to_process(series)
                    logger.info(f"Image set to process for series {unprocessed_series.id}")

                    logger.info(f"Settings parsed series {unprocessed_series.name} as processed")
                    await self.parsed_series_repo.set_series_as_processed(unprocessed_series.id)
                    logger.info(f"Series {unprocessed_series.name} marked as processed")
                except Exception as e:
                    logger.error(
                        f"Error processing series {unprocessed_series.name} (ID: {unprocessed_series.id}): {e}")
                    logger.error(f"Removing saved series {unprocessed_series.id} due some error")
                    await self.release_series_repo.remove_unprocessed_series(series.id)
                    logger.info(f"Settings parsed series {unprocessed_series.name} as processed with errors")
                    await self.parsed_series_repo.set_series_as_processed_with_errors(unprocessed_series.id)

            except Exception as e:
                logger.error(
                    f"Unexpected error during processing series {unprocessed_series.name} (ID: {unprocessed_series.id}): {e}")
                logger.info(f"Settings parsed series {unprocessed_series.name} as processed with errors")
                await self.parsed_series_repo.set_series_as_processed_with_errors(unprocessed_series.id)

        return

    async def _get_unprocessed_series(self, count: int) -> list[ParsedSeries] | None:
        try:
            return await self.parsed_series_repo.get_unprocessed_series(count)
        except EntityNotFound as e:
            logger.error(e)
        except DBConnectionError as e:
            logger.error(e)
        except Exception as e:
            logger.error(f"Unexpected error during processing characters: {e}")
        return None

    async def _set_image_to_process(self, series: ParsedSeries):
        try:
            origin_reference_id = await self.image_reference_origin_repo.get_id_by_table_and_column(table="series",
                                                                                                    column="primary_image")
            if origin_reference_id:
                if series.primary_image:
                    await self.parsed_images_repo.set(
                        ParsedImage(
                            original_link=series.primary_image,
                            origin_reference_id=origin_reference_id,
                            origin_record_id=series.id
                        )
                    )
        except EntityNotFound:
            raise
        except Exception as e:
            logger.error(f"Unexpected error during setting image reference origin: {e}")
            raise

    @staticmethod
    async def _process_name(series: ParsedSeries):
        series.display_name = series.name
        series.name = NameFormatter.format_name(series.name)

    async def _set_parent_id(self, series: ParsedSeries):
        """
        Function gets parsed_series DTO by parent_id from unprocessed_series and searches the exact same record in release series repo to get its new ID.
        :param series:
        :return:
        """
        if series.parent_id:
            parent_series: ParsedSeries = await self.parsed_series_repo.get_series_by_id(series.parent_id)
            ic(parent_series.series_type)
            ic(parent_series.id)
            ic(parent_series.name)
            series.parent_id = await self.release_series_repo.get_parent_id(parent_series)
        else:
            raise ValueError(f"Series {series.name} is secondary but has no parent_id")
