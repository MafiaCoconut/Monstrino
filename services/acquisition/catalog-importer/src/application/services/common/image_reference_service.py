from typing import Any

from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ImageImportQueue

from application.ports import Repositories


class ImageReferenceService:
    async def set_image_to_process(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            table: str,
            field: str,
            image_link: str,
            record_id: int
    ):
        ref_id = await uow.repos.image_reference_origin.get_id_by_table_and_field(table, field)
        if ref_id and image_link:
            await uow.repos.image_import_queue.save(
                ImageImportQueue(
                    original_url=image_link,
                    origin_reference_id=ref_id,
                    origin_record_id=record_id,
                )
            )
