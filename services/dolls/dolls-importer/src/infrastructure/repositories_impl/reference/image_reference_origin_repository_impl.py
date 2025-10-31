import logging

from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.orm import ImageReferenceOrigin
from sqlalchemy import select, and_
from infrastructure.db.base import async_session_factory

logger = logging.getLogger(__name__)

from application.repositories.destination.reference.image_reference_origin_repository import \
    ImageReferenceOriginRepository


class ImageReferenceOriginRepositoryImpl(ImageReferenceOriginRepository):
    async def get_id_by_table_and_column(self, table: str, column: str) -> int | None:
        async with async_session_factory() as session:
            query = select(ImageReferenceOrigin.id).where(
                and_(
                    ImageReferenceOrigin.origin_table == table,
                    ImageReferenceOrigin.origin_column == column,
            ))
            result = await session.execute(query)
            if result:
                reference_id = result.scalars().first()
                if reference_id:
                    return reference_id
                else:
                    logger.error(f"Reference with table:{table} and column:{column} was not found")
                    raise EntityNotFound(f"Reference with table:{table} and column:{column} was not found")
            else:
                logger.error(f"Error by getting reference id by table:{table} and column:{column} from DB")
                raise DBConnectionError(f"Error by getting reference id by table:{table} and column:{column} from DB")

