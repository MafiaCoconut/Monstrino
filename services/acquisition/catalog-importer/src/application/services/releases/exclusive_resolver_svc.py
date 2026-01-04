from typing import Any
import logging

from icecream import ic
from monstrino_core.domain.errors import ExclusiveDataInvalidError
from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleaseExclusiveLink, ExclusiveVendor

from bootstrap.container_components import Repositories

logger = logging.getLogger(__name__)

class ExclusiveResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            exclusive_list: list[str]
    ) -> None:
        if not exclusive_list:
            return
        ic(exclusive_list)
        for vendor in exclusive_list:
            ic(vendor)
            ic(f"formatted_name: {NameFormatter.format_name(vendor)}")
            vendor_id = await uow.repos.exclusive_vendor.get_id_by(**{ExclusiveVendor.NAME: NameFormatter.format_name(vendor)})
            ic(vendor_id)
            if vendor_id:
                release_exclusive_link = ReleaseExclusiveLink(
                        release_id=release_id,
                        vendor_id=vendor_id
                    )
                ic(release_exclusive_link)
                await uow.repos.release_exclusive_link.save(release_exclusive_link)
            else:
                logger.error(f"Exclusive vendor found in parser data, but not found in db with name: {vendor}")
                raise ExclusiveDataInvalidError()
