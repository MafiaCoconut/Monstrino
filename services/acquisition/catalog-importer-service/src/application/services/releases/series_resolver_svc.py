from typing import Any
import logging
from monstrino_core import NameFormatter, UnitOfWorkInterface, SeriesDataInvalidError
from monstrino_models.dto import ParsedRelease, ReleaseSeriesLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)

class SeriesResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            series_list: list[dict]
    ) -> None:
        for series in series_list:
            name = series.get('text')
            if name:
                series_id = await uow.repos.series.get_id_by_name(name)
                if series_id:
                    link = ReleaseSeriesLink(
                        release_id=release_id,
                        series_id=series_id
                    )
                    await uow.repos.release_series_link.save(link)
                else:
                    logger.error(
                        f"Series found in parser data, "
                        f"but not found in db with name: {name}",
                    )
            raise SeriesDataInvalidError
