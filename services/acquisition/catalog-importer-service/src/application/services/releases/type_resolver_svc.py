from typing import Any
import logging
from monstrino_core import UnitOfWorkInterface, NameFormatter
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
        for type_entry in type_list:
            type_name = type_entry.get('text')
            if not type_name:
                logger.error(f"Type missing 'text' field in data: {type_entry}")
                continue

            type_name_f = NameFormatter.format_name(type_name)
            type_id = await uow.repos.release_type.get_id_by(name=type_name_f)
            if not type_id:
                logger.error(f"Type found in parser data, but not found in db with name {type_name_f}")

            if await uow.repos.release_type_link.exists_by(
                    release_id=release_id,
                    type_id=type_id
            ):
                logger.error(f"Type link already exists for release_id={release_id} and type_id={type_id}. Skipping")
                continue

            await uow.repos.release_type_link.save(
                ReleaseTypeLink(
                    release_id=release_id,
                    type_id=type_id
                )
            )

    async def _resolve_content_type(self):
        ...

    async def _resolve_packaging_type(self):
        ...

    async def _resolve_tier_type(self):
        ...

