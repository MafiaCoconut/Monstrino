from typing import Any, Optional
import logging
from uuid import UUID

from icecream import ic
from monstrino_core.domain.errors import ReleaseContentTypeDataInvalidError, ReleaseContentTypeNotFoundError, \
    ReleasePackTypeDataInvalidError, ReleasePackTypeNotFoundError, ReleaseTypeNotFoundError, \
    ReleasePackTypeProvidedButCanNotBeMappedError
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.domain.services.catalog import ReleaseTypePackTypeResolver, ReleaseTypeTierResolver
from monstrino_core.domain.value_objects import ReleaseTypeContentType, ReleaseTypeTierType, \
    ReleaseTypeTierDecision, ReleaseTypePackCountType, ReleaseTypePackType
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleaseTypeLink, ReleaseType

from application.ports import Repositories

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
    @staticmethod
    async def _set_type(uow: UnitOfWorkInterface[Any, Repositories], release_id: UUID, type_f: str):
        ic(type_f)
        type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.CODE: type_f})
        if not type_id:
            raise ReleaseTypeNotFoundError(f"Pack type found in parser data, but not found in db with code {type_f}")
        release_type_link = ReleaseTypeLink(
            release_id=release_id,
            type_id=type_id
        )
        await uow.repos.release_type_link.save(release_type_link)


class ContentTypeResolverService(TypeResolverService):
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            type_list: list[str],
            character_count: int,
            pet_count: int,
    ):
        if not type_list:
            type_list = []

        n_type_list = []

        if len(type_list) > 0:
            normalized_type_list = {TitleFormatter.to_code(t) for t in type_list}
            n_type_list = list(normalized_type_list)

        if pet_count > 0 and ReleaseTypeContentType.PET_FIGURE not in type_list:
            n_type_list.append(ReleaseTypeContentType.PET_FIGURE)

        if character_count > 0 and ReleaseTypeContentType.DOLL_FIGURE not in type_list:
            n_type_list.append(ReleaseTypeContentType.DOLL_FIGURE)

        if "playsets" in n_type_list:
            n_type_list.pop(n_type_list.index("playsets"))
            n_type_list.append(ReleaseTypeContentType.PLAYSET)
        ic(n_type_list)
        for type_code in n_type_list:
            await self._set_type(uow, release_id, type_code)


class PackTypeResolverService(TypeResolverService):
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            pack_type_list: list[str],
            release_character_count: int,

    ):
        """
        1. If pack_type is not provided, set single pack
        2. If pack_type is provided, map it to PackagingType enum
        3. If pack_type is multipack, also set multipack type
        4. If pack_type is playset do not set single pack
        """

        # TODO Добавить дополнительную проверку описания релиза на наличие упоминнаний о дополнительных типах релиза

        is_multipack_count_found = False
        if pack_type_list:
            resolved_types = ReleaseTypePackTypeResolver.resolve_list(pack_type_list)
            if len(resolved_types) < len(pack_type_list):
                raise ReleasePackTypeDataInvalidError(
                    f"Some of provided pack types could not be resolved: {pack_type_list}"
                )
            if resolved_types:
                for pack_f in resolved_types:
                    await self._set_type(uow, release_id, pack_f)
                    if pack_f in ReleaseTypePackCountType:
                        is_multipack_count_found = True

        if not await uow.repos.release_type_link.exists_by_release_type_code(ReleaseTypeContentType.PLAYSET):
            if not is_multipack_count_found:
                await self._set_single_multipack(uow, release_id, release_character_count)

    async def _set_single_multipack(self, uow, release_id: UUID, release_character_count: int):
        if release_character_count > 0:
            mapped = ReleaseTypePackTypeResolver().map_n_pack(release_character_count)

            await self._set_type(uow, release_id, mapped)

            if mapped != ReleaseTypePackCountType.SINGLE_PACK:
                await self._set_multi_pack(uow, release_id)

    async def _set_multi_pack(self, uow, release_id: UUID):
        await self._set_type(uow, release_id, ReleaseTypePackCountType.MULTIPACK)


class TierTypeResolverService(TypeResolverService):
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            tier_type: Optional[str],
            release_title: str,
            release_source: str,
            has_deluxe_packaging: bool,

    ):
        if tier_type and tier_type in {e.value for e in ReleaseTypeTierType}:
            tier_type_result = tier_type
        else:
            result = ReleaseTypeTierResolver.resolve(
                title=release_title, source=release_source, tier_type=tier_type, has_deluxe_packaging=has_deluxe_packaging
            )
            # logger.info(f"Resolved tier type for release_id={release_id}: {result.tier} (reason: {result.reason})")
            tier_type_result = result.tier

        await self._set_type(uow, release_id, tier_type_result)

