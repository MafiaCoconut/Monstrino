from typing import Any
import logging

from icecream import ic
from monstrino_core.domain.errors import ReleaseContentTypeDataInvalidError, ReleaseContentTypeNotFoundError, \
    ReleasePackTypeDataInvalidError, ReleasePackTypeNotFoundError
from monstrino_core.domain.services import NameFormatter, ReleaseTypePackTypeResolver, ReleaseTypeTierResolver
from monstrino_core.domain.value_objects import ReleaseTypePackagingType, ReleaseTypeContentType, ReleaseTypeTierType, \
    ReleaseTypeTierDecision, ReleaseTypePackTypeIntToStrMapper, ReleaseTypePackCountType, ReleaseTypePackType
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleaseTypeLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)


class TypeResolverService:
    """
    Received data format  list["type_1", "type_2", "type_3"]

    3 Main processing steps:
    - Process content types
    - Process packaging type
    - Process tier type

    Content types:
    - Map each type in the list to ReleaseTypeContentType enum
    - For each mapped type, retrieve its ID from the database
    - Create and save ReleaseTypeLink entries linking the release to each content type ID

    Packaging type:
    - Find if packaging type is provided in list
    - If not provided, set single pack
    - If provided, map it to ReleaseTypePackagingType enum and validate through ReleaseTypePackTypeResolver
    - Create and save ReleaseTypeLink entry for n-pack and ReleaseTypeLink for multipack

    Tier type:
    - Validate through domain ReleaseTypeTierResolver service
    - Create and save ReleaseTypeLink entry for tier type

    """
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            content_type_list: list[str],
            pack_type_list: list[str],
            release_character_count: int,
            tier_type: str,
            release_name: str,
            release_source: str,
            has_deluxe_packaging: bool = False,

    ) -> None:
        await self._resolve_content_type(uow, release_id, content_type_list)
        await self._resolve_packaging_type(uow, release_id, pack_type_list, release_character_count)
        await self._resolve_tier_type(uow, release_id, tier_type, release_name, release_source, has_deluxe_packaging)

    async def _resolve_content_type(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            type_list: list[str],
    ):
        """

        :param uow:
        :param release_id:
        :param type_list:
        :return:
        """
        # release_types = [r_type.name for r_type in await uow.repos.release_type.get_all()]
        if not type_list:
            raise ReleaseContentTypeDataInvalidError("No content types provided in parser data")
        normalized_type_list = {NameFormatter.format_name(t) for t in type_list}
        for type_name in normalized_type_list:
            type_name_f = NameFormatter.format_name(type_name)
            content_type_id = await uow.repos.release_type.get_id_by(name=type_name_f)
            if not content_type_id:
                raise ReleaseContentTypeNotFoundError(f"Type found in parser data, but not found in db with name {type_name_f}")

            await uow.repos.release_type_link.save(
                ReleaseTypeLink(
                    release_id=release_id,
                    type_id=content_type_id
                )
            )

    async def _resolve_packaging_type(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            pack_type_list: list[str],
            release_character_count: int,
    ):
        """
        1. If pack_type is not provided, set single pack
        2. If pack_type is provided, map it to PackagingType enum
        3. IF pack_type is multipack, also set multipack type
        """

        # TODO Добавить дополнительную проверку описания релиза на наличие упоминнаний о дополнительных типах релиза


        is_multipack_count_found = False

        resolved_types = ReleaseTypePackTypeResolver.resolve_list(pack_type_list)

        if resolved_types:
            for pack_f in resolved_types:
                await self._set_pack(uow, release_id, pack_f)
                if pack_f in ReleaseTypePackCountType:
                    is_multipack_count_found = True

        if not is_multipack_count_found:
            if release_character_count > 0:
                mapped = ReleaseTypePackTypeResolver().map_n_pack(release_character_count)
                await self._set_count_pack_type(uow, release_id, mapped)

    async def _set_pack(self, uow, release_id, pack_f: str):
        type_id = await uow.repos.release_type.get_id_by(name=pack_f)
        await uow.repos.release_type_link.save(
            ReleaseTypeLink(
                release_id=release_id,
                type_id=type_id
            )
        )


    async def _set_count_pack_type(self, uow, release_id: int, pack: str):
        await self._set_pack(uow, release_id, pack)

        if pack != ReleaseTypePackagingType.SINGLE_PACK:
            await self._set_multi_pack(uow, release_id)

    async def _set_multi_pack(self, uow, release_id: int):
        common_multi_pack_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.MULTI_PACK)

        if common_multi_pack_id:
            await uow.repos.release_type_link.save(
                ReleaseTypeLink(
                    release_id=release_id,
                    type_id=common_multi_pack_id
                )
            )


    async def _resolve_tier_type(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            tier_type: str,
            release_name: str,
            release_source: str,
            has_deluxe_packaging: bool,

    ):
        if tier_type and tier_type in {e.value for e in ReleaseTypeTierType}:
            tier_type_result = tier_type
        else:
            result = ReleaseTypeTierResolver.resolve(
                name=release_name, source=release_source, has_deluxe_packaging=has_deluxe_packaging
            )
            logger.info(f"Resolved tier type for release_id={release_id}: {result.tier} (reason: {result.reason})")
            tier_type_result = result.tier

        await uow.repos.release_type_link.save(
            ReleaseTypeLink(
                release_id=release_id,
                type_id=await uow.repos.release_type.get_id_by(name=tier_type_result)
            )
        )



