import logging

from monstrino_models.dto import ParsedImage
from monstrino_models.orm import ParsedImagesORM

from infrastructure.db.base import async_session_factory

from application.repositories import ParsedImagesRepo

logger = logging.getLogger(__name__)


class ParsedImagesRepositoryImpl(ParsedImagesRepo):
    async def set(self, data: ParsedImage):
        async with async_session_factory() as session:
            parsed_image_orm = ParsedImagesORM(
                original_link=data.original_link,
                origin_reference_id=data.origin_reference_id,
                origin_record_id=data.origin_record_id,
                process_state="init"
            )
            session.add(parsed_image_orm)
            await session.commit()