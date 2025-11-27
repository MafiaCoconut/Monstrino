from typing import Any

from monstrino_core.domain.errors import ParentSeriesNotFoundError
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedSeries, Series

from app.container_components import Repositories



class ParentResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            parsed_series: ParsedSeries,
            series: Series,
    ):
        parsed_parent_series: ParsedSeries = await uow.repos.parsed_series.get_one_by(id=parsed_series.parent_id)
        if parsed_parent_series:
            parent_id = await uow.repos.series.get_id_by_display_name(parsed_parent_series.name)
            if parent_id:
                series.parent_id = parent_id
                return

        raise ParentSeriesNotFoundError