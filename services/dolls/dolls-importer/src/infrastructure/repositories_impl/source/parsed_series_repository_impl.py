from monstrino_models.orm.parsed.parsed_series_orm import ParsedSeriesORM

from application.repositories.source.parsed_series_repository import ParsedSeriesRepository
from infrastructure.db.base import async_session_factory


class ParsedSeriesRepositoryImpl(ParsedSeriesRepository):
    async def save(self, data):
        async with async_session_factory() as session:
            series_orm = self._format_pydantic_to_orm(data)
            session.add(series_orm)
            await session.commit()

    @staticmethod
    def _format_pydantic_to_orm(dto):
        return ParsedSeriesORM(
            name=dto.name,
            display_name=dto.display_name,
            series_type=dto.series_type,
            description=dto.description,
            primary_image=dto.primary_image,
            link=dto.link,
            process_state="init",
            original_html_content=dto.original_html_content,
        )
