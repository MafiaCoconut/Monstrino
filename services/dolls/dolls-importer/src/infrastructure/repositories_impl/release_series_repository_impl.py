import logging

from monstrino_models.dto.dolls.parsed.parsed_series import ParsedSeries
from monstrino_models.dto.dolls.releases.release_series import ReleaseSeries
from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.exceptions.post_parser_processing.exceptions import SavingParsedRecordWithErrors
from monstrino_models.orm import ReleaseSeriesORM
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError

from application.repositories.destination.release_series_repository import ReleaseSeriesRepository
from infrastructure.db.base import async_session_factory

logger = logging.getLogger(__name__)


class ReleaseSeriesRepositoryImpl(ReleaseSeriesRepository):
    async def save_unprocessed_series(self, series: ParsedSeries):
        try:
            async with async_session_factory() as session:
                series_orm = ReleaseSeriesORM(
                    name=series.name,
                    display_name=series.display_name,
                    description=series.description,
                    series_type=series.series_type,
                    primary_image=series.primary_image,
                    parent_id=series.parent_id
                )
                session.add(series_orm)
                await session.commit()
                await session.refresh(series_orm)
                return self._refactor_orm_to_entity(series_orm)
        except IntegrityError as e:
            raise SavingParsedRecordWithErrors(F"Series with name {series.name} already exists: {e}")

        except Exception as e:
            raise SavingParsedRecordWithErrors(f"Error saving series {series.name}: {e}") from e

    async def remove_unprocessed_series(self, series_id: int):
        async with async_session_factory() as session:
            try:
                query = select(ReleaseSeriesORM).where(ReleaseSeriesORM.id == series_id)
                result = await session.execute(query)
                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    logger.error(f"Series with id {series_id} not found in DB")
                    raise EntityNotFound(f"Series with id {series_id} not found")

                await session.delete(series_orm)
                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                logger.error(f"Error deleting series {series_id}: {e}")
                raise DBConnectionError(f"Failed to delete series {series_id}")

    async def get_parent_id(self, series: ReleaseSeries) -> int:
        async with async_session_factory() as session:
            try:
                query = select(ReleaseSeriesORM).where(and_(
                    ReleaseSeriesORM.display_name == series.name,
                    ReleaseSeriesORM.series_type == series.series_type
                ))
                result = await session.execute(query)
                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    raise EntityNotFound(f"Series {series.name} not found")

                return series_orm.id

            except EntityNotFound:
                raise
            except Exception as e:
                raise DBConnectionError(f"Failed to get parent_id for series {series.name} :{e}")

    @staticmethod
    def _refactor_orm_to_entity(data: ReleaseSeriesORM) -> ReleaseSeries:
        return ReleaseSeries(
            id=data.id,
            name=data.name,
            display_name=data.display_name,
            description=data.description,
            series_type=data.series_type,
            primary_image=data.primary_image,
            parent_id=data.parent_id
        )
