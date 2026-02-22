from typing import Any, Optional
import logging
from uuid import UUID

from docutils.nodes import description
from icecream import ic
from monstrino_core.application.pagination import Page
from monstrino_core.domain.value_objects.release import ReleaseRelationType

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Release, ReleaseSeriesLink
from monstrino_models.orm import *

from app.queries.release_search import ReleaseSearchDTO
from domain.models import ReleaseSearchQuery, IncludeReleaseSpec
from domain.models.release_search import ReleaseListItem
from domain.models.release_search.release_filters import ReleaseFilters
from src.app.ports import Repositories
from sqlalchemy import select, delete, func, Select, and_, or_, exists, literal, not_


class ReleaseSearchUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
    ) -> None:
        self.uow_factory = uow_factory

    async def execute(
            self,
            dto: ReleaseSearchDTO
    ) -> Page[ReleaseListItem]:
        """
        Inside logic:
        Release filters logic
        if

        :param dto:
        :return:
        """
        query = dto.query
        results: Page = await self.search(query)
        return results

    async def search(self, query: ReleaseSearchQuery) -> Page:
        base_stmt = self._build_stmt(query)
        count_stmt = self._build_count_stmt(base_stmt)

        paged_stmt = (
            base_stmt
            .order_by(ReleaseORM.id.desc())
            .limit(query.page.limit)
            .offset(query.page.offset)
        )
        async with self.uow_factory.create() as uow:
            rows = await uow.repos.release.execute_stmt_all_mappings(paged_stmt)
            total = await self._scalar_int(uow, count_stmt)

        items = [
            ReleaseListItem(
                id=str(row.get("id")),
                code=row.get("code", None),
                slug=row.get("slug", None),
                title=row.get("title", None),
                mpn=row.get("mpn", None),
                description=row.get("description", None),
                text_from_box=row.get("text_from_box", None),
                year=row.get("year", None),
                characters_display_name=row.get("characters_display_name", None),
                primary_image=row.get("primary_image", None),
                release_types=row.get("release_types", None),
            )
            for row in rows
        ]
        return Page(items=items, total=total, page=query.page.offset+1, page_size=query.page.limit)

    def _build_stmt(self, query: ReleaseSearchQuery) -> Select:
        query_include = query.include

        col_factories = {
            "id":               lambda: ReleaseORM.id,
            "code":             lambda: ReleaseORM.code,
            "slug":             lambda: ReleaseORM.slug,
            "title":            lambda: ReleaseORM.title,
            "description":      lambda: ReleaseORM.description,
            "text_from_box":    lambda: ReleaseORM.text_from_box,
            "mpn":              lambda: ReleaseORM.mpn,
            "year":             lambda: ReleaseORM.year,

            "primary_image":            lambda: self._get_primary_image(),
            "characters_display_name":  lambda: self._get_character_display_names(),
            "release_types":            lambda: self._get_release_types(),
        }

        if query_include.all:
            cols = [
                col_factories[name]().label(name)
                for name in col_factories
            ]
        elif query_include.base_info:
            include_spec = self._set_include_spec_base_info()
            cols = [
                col_factories[name]().label(name)
                for name in col_factories
                if getattr(include_spec, name, False)
            ]
        else:
            cols = [
                col_factories[name]().label(name)
                for name in col_factories
                if getattr(query_include, name, False)
            ]

        if not cols:
            cols = [ReleaseORM.id.label("id")]

        stmt = select(*cols)

        stmt = self._apply_filters(stmt, query.filters)
        return stmt

    def _get_primary_image(self):
        return (
            select(ReleaseImageORM.image_url)
            .where(
                ReleaseImageORM.release_id == ReleaseORM.id,
                ReleaseImageORM.is_primary.is_(True),
            )
            .limit(1)
            .scalar_subquery()
        )

    from sqlalchemy import Select, func, select

    def _get_character_display_names(self):
        return (
            select(func.array_agg(CharacterORM.title))
            .select_from(ReleaseCharacterORM)
            .join(CharacterORM, CharacterORM.id == ReleaseCharacterORM.character_id)
            .where(ReleaseCharacterORM.release_id == ReleaseORM.id)  # correlation to outer query
            .correlate(ReleaseORM)
            .scalar_subquery()
        )

    def _get_release_types(self):
        return (
            select(
                func.array_agg(
                    func.json_build_object(
                        "display_name", ReleaseTypeORM.title,
                        "category", ReleaseTypeORM.category
                    )
                )
            )
            .select_from(ReleaseTypeLinkORM)
            .join(
                ReleaseTypeORM,
                ReleaseTypeORM.id == ReleaseTypeLinkORM.type_id,
            )
            .where(ReleaseTypeLinkORM.release_id == ReleaseORM.id)
            .correlate(ReleaseORM)
            .scalar_subquery()
        )


    def _build_count_stmt(self, base_stmt: Select) -> Select:
        # count(*) по подзапросу — безопасно, потому что мы не делаем join и не плодим дубли
        subq = base_stmt.subquery()
        return select(func.count(literal(1))).select_from(subq)

    async def _scalar_int(self, uow, stmt: Select) -> int:
        v = await uow.repos.release.execute_stmt_one_scalar(stmt)
        return int(v or 0)


    def _apply_filters(self, stmt: Select, f: ReleaseFilters) -> Select:
        # Каждый фильтр — отдельная функция.
        # Важно: почти всё через EXISTS, чтобы не было дублей и DISTINCT.
        stmt = self._apply_release_ids(stmt, f)
        stmt = self._apply_search(stmt, f)
        stmt = self._apply_mpn(stmt, f)
        stmt = self._apply_year_range(stmt, f)
        stmt = self._apply_is_reissue(stmt, f)
        # stmt = self._apply_country_codes(stmt, f)

        stmt = self._apply_series_ids(stmt, f)
        stmt = self._apply_character_ids(stmt, f)
        stmt = self._apply_release_type_ids(stmt, f)
        stmt = self._apply_exclusive_ids(stmt, f)
        stmt = self._apply_has_images(stmt, f)


        # date_from/date_to — аналогично year-range, но лучше перевести в date/datetime
        # stmt = self._apply_date_from(stmt, f)

        return stmt


    def _apply_release_ids(self, stmt: Select, f: ReleaseFilters) -> Select:
        if not f.release_ids:
            return stmt

        release_ids = [UUID(rid) for rid in f.release_ids]
        return stmt.where(ReleaseORM.id.in_(release_ids))

    def _apply_search(self, stmt: Select, f: ReleaseFilters) -> Select:
        if not f.search:
            return stmt
        s = f"%{f.search}%"
        # минимум: по названию
        return stmt.where(ReleaseORM.title.ilike(s))

    def _apply_year_range(self, stmt: Select, f: ReleaseFilters) -> Select:
        if f.year_from is None and f.year_to is None:
            return stmt
        conds = []
        if f.year_from is not None:
            conds.append(ReleaseORM.year >= f.year_from)
        if f.year_to is not None:
            conds.append(ReleaseORM.year <= f.year_to)
        return stmt.where(and_(*conds))

    def _apply_mpn(self, stmt: Select, f: ReleaseFilters) -> Select:
        if f.mpn is None:
            return stmt

        return stmt.where(ReleaseORM.mpn == f.mpn)

    def _apply_is_reissue(self, stmt: Select, f: ReleaseFilters) -> Select:
        if f.is_reissue is None:
            return stmt

        reissue_exists = exists(
            select(literal(1))
            .select_from(ReleaseRelationLinkORM)
            .join(RelationTypeORM, RelationTypeORM.id == ReleaseRelationLinkORM.relation_type_id)
            .where(
                ReleaseRelationLinkORM.release_id == ReleaseORM.id,
                RelationTypeORM.name == ReleaseRelationType.REISSUE
            )
        )

        return stmt.where(reissue_exists)

    # def _apply_country_codes(self, stmt: Select, f: ReleaseFilters) -> Select:
    #     if not f.country_codes:
    #         return stmt
    #     # предположим, Release.country_code = "US", "DE" и т.п.
    #     return stmt.where(ReleaseORM.country_code.in_(f.country_codes))

    def _apply_series_ids(self, stmt: Select, f: ReleaseFilters) -> Select:
        if not f.series_ids:
            return stmt

        series_exists = exists(
            select(literal(1)).where(
                ReleaseSeriesLinkORM.release_id == ReleaseORM.id,
                ReleaseSeriesLinkORM.series_id.in_(f.series_ids),
            )
        )
        return stmt.where(series_exists)

    def _apply_character_ids(self, stmt: Select, f: ReleaseFilters) -> Select:
        if not f.character_ids:
            return stmt

        char_exists = exists(
            select(literal(1)).where(
                ReleaseCharacterORM.release_id == ReleaseORM.id,
                ReleaseCharacterORM.character_id.in_(f.character_ids),
            )
        )
        return stmt.where(char_exists)

    def _apply_release_type_ids(self, stmt: Select, f: ReleaseFilters) -> Select:
        if not f.release_type_ids:
            return stmt

        rt_exists = exists(
            select(literal(1)).where(
                ReleaseTypeLinkORM.release_id == ReleaseORM.id,
                ReleaseTypeLinkORM.type_id.in_(f.release_type_ids),
            )
        )
        return stmt.where(rt_exists)

    def _apply_exclusive_ids(self, stmt: Select, f: ReleaseFilters) -> Select:
        if not f.exclusive_ids:
            return stmt

        ex_exists = exists(
            select(literal(1)).where(
                ReleaseExclusiveLinkORM.release_id == ReleaseORM.id,
                ReleaseExclusiveLinkORM.vendor_id.in_(f.exclusive_ids),
            )
        )
        return stmt.where(ex_exists)

    def _apply_has_images(self, stmt: Select, f: ReleaseFilters) -> Select:
        if f.has_images is None:
            return stmt

        img_exists = exists(
            select(literal(1)).where(ReleaseImageORM.release_id == ReleaseORM.id)
        )

        return stmt.where(img_exists) if f.has_images else stmt.where(not_(img_exists))


    def _set_include_spec_base_info(self) -> IncludeReleaseSpec:
        return IncludeReleaseSpec(
            id=True,
            mpn=True,
            title=True,
            code=True,
            year=True,
        )

