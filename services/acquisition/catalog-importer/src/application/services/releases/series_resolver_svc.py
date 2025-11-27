from typing import Any
import logging

from icecream import ic
from monstrino_core.domain.errors import SeriesDataInvalidError
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.value_objects import SeriesTypes, SeriesRelationTypes
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleaseSeriesLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)

class SeriesResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            series_list: list[str]
    ) -> None:
        for parsed_series_name in series_list:
            series = await uow.repos.series.get_one_by(name=NameFormatter.format_name(parsed_series_name))
            if series:
                if series.series_type == SeriesTypes.PRIMARY:
                    await self._set_series_relation(
                        uow=uow,
                        release_id=release_id,
                        series_id=series.id,
                        relation_type=SeriesRelationTypes.PRIMARY
                    )
                elif series.series_type == SeriesTypes.SECONDARY:
                    # TODO проверять что если добавляются поочередно primary and secondary тогда не нужно добавлять primary еще раз
                    series_parent = await uow.repos.series.get_one_by_id(series.parent_id)
                    if series_parent:
                        await self._set_series_relation(
                            uow=uow,
                            release_id=release_id,
                            series_id=series_parent.id,
                            relation_type=SeriesRelationTypes.PRIMARY
                        )
                        await self._set_series_relation(
                            uow=uow,
                            release_id=release_id,
                            series_id=series.id,
                            relation_type=SeriesRelationTypes.SECONDARY
                        )
                    else:
                        logger.error(f"Parent series not found for secondary series: {parsed_series_name}")

                else:
                    logger.error(
                        f"Series found in parser data, but has invalid series type: {series.series_type}",
                    )
            else:
                logger.error(
                    f"Series found in parser data, but not found in db with name: {name}",
                )


    async def _set_series_relation(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            series_id: int,
            relation_type: SeriesRelationTypes
    ) -> None:
        if not await self._validate_series_exist(uow, release_id, series_id, relation_type):
            await uow.repos.release_series_link.save(
                ReleaseSeriesLink(
                    release_id=release_id,
                    series_id=series_id,
                    relation_type=relation_type
                )
            )

    async def _validate_series_exist(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            series_id: int,
            relation_type: SeriesRelationTypes
    ) -> bool:
        return await uow.repos.release_series_link.exists_by(
            release_id=release_id,
            series_id=series_id,
            relation_type=relation_type
        )


