from typing import Any
import logging
from monstrino_core import UnitOfWorkInterface, NameFormatter, ReleaseTypePackTypeMapper, \
    ReleaseContentTypeDataInvalidError, ReleaseContentTypeNotFoundError, ReleasePackTypeDataInvalidError, \
    ReleasePackTypeNotFoundError, ReleaseContentTypeLinkAlreadyExistsError
from monstrino_core.enums.release.release_type.packaging_type_enum import PackagingType
from monstrino_models.dto import ParsedRelease, ReleaseTypeLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)


class TypeResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            type_list: list[dict],
            multi_pack_list: list[dict]
    ) -> None:
        await self._resolve_content_type(uow, release_id, type_list)
        await self._resolve_packaging_type(uow, release_id, multi_pack_list)

    async def _resolve_content_type(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            type_list: list[dict],
    ):
        for type_entry in type_list:
            type_name = type_entry.get('text')
            if not type_name:
                raise ReleaseContentTypeDataInvalidError(f"Type missing 'text' field in data: {type_entry}")

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
            pack_type_list: list[dict],
    ):
        """
        1. If pack_type is not provided, set single pack
        2. If pack_type is provided, map it to PackagingType enum
        3. IF pack_type is multi-pack, also set multi-pack type
        """

        pack_type_data = pack_type_list[0]
        pack_type = pack_type_data.get('text')
        if not pack_type:
            raise ReleasePackTypeDataInvalidError(f"Pack type missing from data: {pack_type_data}")

        pack_f = ReleaseTypePackTypeMapper.map(pack_type)
        if pack_f == PackagingType.SINGLE_PACK:
            await self._set_single_pack(uow, release_id)
        else:
            await self._set_multi_pack(uow, release_id, pack_type)

    async def _set_single_pack(self, uow, release_id: int):
        type_id = await uow.repos.release_type.get_id_by(name=PackagingType.SINGLE_PACK)
        await uow.repos.release_type_link.save(
            ReleaseTypeLink(
                release_id=release_id,
                type_id=type_id
            )
        )

    async def _set_multi_pack(self, uow, release_id: int, pack_type: str):
        pack_f = ReleaseTypePackTypeMapper.map(pack_type)
        type_id = await uow.repos.release_type.get_id_by(name=pack_f)
        if not type_id:
            raise ReleasePackTypeNotFoundError(f"Multi-pack found in parser data, but not found in db with name {pack_f}")

        await uow.repos.release_type_link.save(
            ReleaseTypeLink(
                release_id=release_id,
                type_id=type_id
            )
        )

        common_multi_pack_id = await uow.repos.release_type.get_id_by(name=PackagingType.MULTI_PACK)

        if common_multi_pack_id:
            await uow.repos.release_type_link.save(
                ReleaseTypeLink(
                    release_id=release_id,
                    type_id=common_multi_pack_id
                )
            )


    async def _resolve_tier_type(self):
        ...x

