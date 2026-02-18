from typing import Any
import logging
from uuid import UUID

from icecream import ic
from monstrino_core.domain.errors import SeriesDataInvalidError
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.domain.value_objects import SeriesTypes, SeriesRelationTypes
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleaseSeriesLink, Series

from app.ports import Repositories

logger = logging.getLogger(__name__)


class SeriesResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            series_list: list[str]
    ) -> None:
        if series_list is None:
            logger.info(
                f'No series data to resolve for release_id: {release_id}')
            return
        for parsed_series_title in series_list:
            series = await uow.repos.series.get_one_by(**{Series.CODE: TitleFormatter.to_code(parsed_series_title)})
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
                        logger.error(
                            f"Parent series not found for secondary series: {parsed_series_title}")

                else:
                    logger.error(
                        f"Series found in parser data, but has invalid series type: {series.series_type}",
                    )
            else:
                logger.error(
                    f"Series found in parser data, but not found in db with title: {parsed_series_title}",
                )

    async def _set_series_relation(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            series_id: UUID,
            relation_type: SeriesRelationTypes
    ) -> None:
        if not await self._validate_series_exist(uow, release_id, series_id, relation_type):
            release_series_link = ReleaseSeriesLink(
                release_id=release_id,
                series_id=series_id,
                relation_type=relation_type
            )
            ic(release_series_link)
            await uow.repos.release_series_link.save(release_series_link)

    async def _validate_series_exist(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            series_id: UUID,
            relation_type: SeriesRelationTypes
    ) -> bool:
        return await uow.repos.release_series_link.exists_by(
            release_id=release_id,
            series_id=series_id,
            relation_type=relation_type
        )
