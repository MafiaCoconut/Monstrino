from typing import Any
import logging

from icecream import ic
from monstrino_core import UnitOfWorkInterface, NameFormatter, ExclusiveDataInvalidError
from monstrino_models.dto import ReleaseExclusiveLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)

class ExclusiveResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            exclusive_list: list[dict]
    ) -> None:
        for exclusive in exclusive_list:
            name = exclusive.get('text')
            if name:
                vendor_id = await uow.repos.exclusive_vendor.get_id_by(
                    name=NameFormatter.format_name(name)
                )
                if vendor_id:
                    if await uow.repos.release_exclusive_link.exists_by(
                        release_id=release_id,
                        vendor_id=vendor_id
                    ):
                        logger.error(
                            f"Exclusive vendor link already exists for release_id={release_id} and vendor={vendor_id}. Skipping")
                        continue

                    await uow.repos.release_exclusive_link.save(
                        ReleaseExclusiveLink(
                            release_id=release_id,
                            vendor_id=vendor_id
                        )
                    )
                else:
                    logger.error(
                        f"Exclusive vendor found in parser data, but not found in db with name: {name}",
                    )
            else:
                raise ExclusiveDataInvalidError(f"Exclusive vendor missing 'text' field in data: {exclusive}")

