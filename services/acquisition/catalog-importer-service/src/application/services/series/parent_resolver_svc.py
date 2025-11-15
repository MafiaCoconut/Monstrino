from monstrino_core import UnitOfWorkInterface, ParentSeriesNotFoundError
from monstrino_models.dto import ParsedSeries, Series
from sqlalchemy.ext.asyncio import AsyncSession

from app.container_components import Repositories


class ParentResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[AsyncSession, Repositories],
            parsed_series: ParsedSeries,
            series: Series,
    ):
        parsed_parent_series: ParsedSeries = await uow.repos.parsed_series.get_one_by_fields_or_none(id=parsed_series.parent_id)
        if parsed_parent_series:
            parent_id = await uow.repos.series.get_id_by_display_name_or_none(parsed_parent_series.name)
            if parent_id:
                series.parent_id = parent_id
                return

        raise ParentSeriesNotFoundError