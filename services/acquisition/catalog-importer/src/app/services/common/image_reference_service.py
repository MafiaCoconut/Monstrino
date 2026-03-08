from typing import Any
from uuid import UUID
from monstrino_core.interfaces import UnitOfWorkInterface

from app.ports import Repositories


class ImageReferenceService:
    async def set_image_to_process(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            table: str,
            field: str,
            image_link: str,
            record_id: UUID
    ):

        # Тут с точки зрения pipeline должно быть добавление изображение по каждому изображению в Kafka Event Bus, для дальнейшей обработки через media ingestion pipeline
        # Мы передаем в kafka release_id, image_url,

        # На данный момент сделан return None как заглушака, это можно не упоминать
        return None

        ref_id = await uow.repos.image_reference_origin.get_id_by_table_and_field(table, field)
        if ref_id and image_link:
            await uow.repos.image_import_queue.save(
                ImageImportQueue(
                    original_url=image_link,
                    origin_reference_id=ref_id,
                    origin_record_id=record_id,
                )
            )
