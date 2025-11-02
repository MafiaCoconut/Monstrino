import logging

from monstrino_models.exceptions import EntityNotFound, DBConnectionError
from monstrino_models.exceptions import SettingProcessStateError
from sqlalchemy import select, update, or_, desc, asc

from monstrino_models.dto import ParsedSeries
from monstrino_models.orm import ParsedSeriesORM

from application.repositories.source.parsed_series_repository import ParsedSeriesRepository
from infrastructure.db.base import async_session_factory

logger = logging.getLogger(__name__)


class ParsedSeriesRepositoryImpl(ParsedSeriesRepository):
    async def get_unprocessed_series(self, count: int = 10) -> list[ParsedSeries] | None:
        async with async_session_factory() as session:
            query = select(ParsedSeriesORM).where(ParsedSeriesORM.process_state=='init').limit(count).order_by(asc(ParsedSeriesORM.id))
            result = await session.execute(query)
            if result:
                series_orms = result.scalars().all()
                if series_orms:
                    return [self._format_orm_to_pydantic(orm) for orm in series_orms]
                else:
                    logger.error(f"Unprocessed series were not found")
                    raise EntityNotFound(f"Unprocessed series were not found")

            else:
                logger.error(f"Error by unprocessed series from DB")
                raise DBConnectionError(f"Error by unprocessed series from DB")

    async def set_series_as_processed(self, series_id: int):
        await self._set_series_process_state(series_id, "processed")

    async def set_series_as_processed_with_errors(self, series_id: int):
       await self._set_series_process_state(series_id, "processed_with_errors")

    @staticmethod
    async def _set_series_process_state(series_id: int, state: str):
        async with async_session_factory() as session:
            try:
                query = select(ParsedSeriesORM).where(ParsedSeriesORM.id == series_id)
                result = await session.execute(query)
                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    logger.error(f"Series with id {series_id} not found in DB")
                    raise EntityNotFound(f"Series with id {series_id} not found")

                series_orm.process_state = state

                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                raise SettingProcessStateError(f"Error updating process_state for series {series_id}: {e}")

    async def get_series_by_id(self, series_id: int) -> ParsedSeries:
        async with async_session_factory() as session:
            try:
                query = select(ParsedSeriesORM).where(ParsedSeriesORM.id == series_id)
                result = await session.execute(query)
                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    raise EntityNotFound(f"Series with id {series_id} not found in DB")

                return self._format_orm_to_pydantic(series_orm)

            except EntityNotFound:
                raise
            except Exception as e:
                raise SettingProcessStateError(f"Error updating process_state for series {series_id}: {e}")




    @staticmethod
    def _format_orm_to_pydantic(orm: ParsedSeriesORM):
        return ParsedSeries(
            id=orm.id,
            name=orm.name,
            description=orm.description,
            series_type=orm.series_type,
            primary_image=orm.primary_image,
            link=orm.link,
            parent_id=orm.parent_id,
            parent_name=orm.parent_name,
            process_state="init",
            source=orm.source,
            original_html_content=orm.original_html_content,
        )


    # @staticmethod
    # def _format_pydantic_to_orm(dto):
    #     return ParsedSeriesORM(
    #         name=dto.name,
    #         display_name=dto.display_name,
    #         series_type=dto.series_type,
    #         description=dto.description,
    #         primary_image=dto.primary_image,
    #         link=dto.link,
    #         process_state="init",
    #         original_html_content=dto.original_html_content,
    #     )
