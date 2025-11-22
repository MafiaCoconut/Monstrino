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
                    link = ReleaseExclusiveLink(
                        release_id=release_id,
                        vendor_id=vendor_id
                    )
                    await uow.repos.release_exclusive_link.save(link)
                else:
                    logger.error(
                        f"Exclusive vendor found in parser data, "
                        f"but not found in db with name: {name}",
                    )
            raise ExclusiveDataInvalidError

