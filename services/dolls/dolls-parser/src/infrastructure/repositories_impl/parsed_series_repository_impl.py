from application.repositories.parsed_series_repository import ParsedSeriesRepository
from domain.entities.parsed_series_dto import ParsedSeriesDTO
from infrastructure.db.base import async_session_factory
from infrastructure.db.models.parsed_series import ParsedSeriesORM


class ParsedSeriesRepositoryImpl(ParsedSeriesRepository):
    async def save(self, data: ParsedSeriesDTO):
        async with async_session_factory() as session:
            series_orm = self._format_pydantic_to_orm(data)
            session.add(series_orm)
            await session.commit()

    @staticmethod
    def _format_pydantic_to_orm(dto: ParsedSeriesDTO):
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
