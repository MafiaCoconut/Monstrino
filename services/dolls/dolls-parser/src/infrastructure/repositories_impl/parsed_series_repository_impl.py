from typing import Optional
from sqlalchemy import select, update, or_, desc, asc, and_
from sqlalchemy.exc import IntegrityError
from monstrino_models.dto import ParsedSeries
from monstrino_models.exceptions import SavingParsedRecordWithErrors, EntityNotFound, DBConnectionError
from monstrino_models.orm import ParsedSeriesORM

from application.repositories.parsed_series_repository import ParsedSeriesRepository
from infrastructure.db.base import async_session_factory


class ParsedSeriesRepositoryImpl(ParsedSeriesRepository):
    async def save(self, data: ParsedSeries):
        async with async_session_factory() as session:
            try:
                series_orm = self._format_pydantic_to_orm(data)
                session.add(series_orm)
                await session.commit()
                await session.refresh(series_orm)
                return series_orm

            except IntegrityError as e:
                raise SavingParsedRecordWithErrors(F"Series with name {data.name} already exists")
            except Exception as e:
                raise SavingParsedRecordWithErrors(f"Error saving series {data.name}: {e}") from e

    async def get_by_name(self, series_name: str) -> Optional[ParsedSeries]:
        async with async_session_factory() as session:
            try:
                query = select(ParsedSeriesORM).where(ParsedSeriesORM.name == series_name)
                result = await session.execute(query)

                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    raise EntityNotFound(f"Series with name {series_name} not found")

                return self._format_orm_to_pydantic(series_orm)

            except EntityNotFound:
                raise
            except Exception as e:
                raise SavingParsedRecordWithErrors(f"Error getting series {series_name}: {e}") from e

    async def get_parent_series(self, series_name: str) -> Optional[ParsedSeries]:
        async with async_session_factory() as session:
            try:
                query = select(ParsedSeriesORM).where(and_(ParsedSeriesORM.name == series_name, ParsedSeriesORM.series_type=='series_prime'))
                result = await session.execute(query)

                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    raise EntityNotFound(f"Series with name {series_name} not found")

                return self._format_orm_to_pydantic(series_orm)

            except EntityNotFound:
                raise
            except Exception as e:
                raise SavingParsedRecordWithErrors(f"Error getting series {series_name}: {e}") from e


    async def set_parent_id(self, parsed_series: ParsedSeries) -> Optional[ParsedSeries]:
        async with async_session_factory() as session:
            try:
                query = select(ParsedSeriesORM).where(and_(
                    ParsedSeriesORM.name == parsed_series.name,
                    ParsedSeriesORM.series_type==parsed_series.series_type,
                    ParsedSeriesORM.link == parsed_series.link,
                    ParsedSeriesORM.source==parsed_series.source))
                result = await session.execute(query)

                series_orm: ParsedSeriesORM = result.scalar_one_or_none()

                if not series_orm:
                    raise EntityNotFound(f"Series with name {parsed_series.name} not found")

                series_orm.parent_id = parsed_series.parent_id

                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                raise SavingParsedRecordWithErrors(f"Error getting series {parsed_series.name}: {e}")

    async def remove_by_parent_id_error(self, parsed_series: ParsedSeries) -> None:
        async with async_session_factory() as session:
            try:
                query = select(ParsedSeriesORM).where(and_(
                    ParsedSeriesORM.name == parsed_series.name,
                    ParsedSeriesORM.series_type==parsed_series.series_type,
                    ParsedSeriesORM.link == parsed_series.link,
                    ParsedSeriesORM.source==parsed_series.source,
                    ParsedSeriesORM.parent_id==None,
                ))
                result = await session.execute(query)
                character_orm = result.scalar_one_or_none()

                if not character_orm:
                    raise EntityNotFound(f"Series with name {parsed_series.name} not found")

                await session.delete(character_orm)
                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                raise DBConnectionError(f"Failed to delete series {parsed_series.name}: {e}")



    @staticmethod
    def _format_pydantic_to_orm(dto: ParsedSeries):
        return ParsedSeriesORM(
            name=dto.name,
            description=dto.description,
            series_type=dto.series_type,
            primary_image=dto.primary_image,
            link=dto.link,
            parent_id=dto.parent_id,
            parent_name=dto.parent_name,
            process_state="init",
            source=dto.source,
            original_html_content=dto.original_html_content,
        )

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

