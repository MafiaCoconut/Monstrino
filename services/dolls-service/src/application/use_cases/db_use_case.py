from infrastructure.db.base import Base, async_engine
import logging
from infrastructure.db.models.dolls_types_orm import DollsTypesORM
from infrastructure.db.models.release_characters_orm import ReleaseCharactersORM
from infrastructure.db.models.dolls_releases_orm import DollsReleasesORM
from infrastructure.db.models.dolls_images_orm import DollsImagesORM
from infrastructure.db.models.dolls_series_orm import DollsSeriesORM
from infrastructure.db.models.original_mh_characters_orm import OriginalMHCharactersORM
from infrastructure.db.models.dolls_relations_orm import DollsRelationsORM

logger = logging.getLogger(__name__)

class DBUseCase:
    def __init__(self):
        pass

    async def restartDB(self):
        await self.delete_db()
        await self.start_db()

    @staticmethod
    async def delete_db():
        try:
            async with async_engine.begin() as conn:
                await conn.run_sync(Base.metadata.drop_all)
        except Exception as e:
            logger.error(e)

    @staticmethod
    async def start_db():
        try:
            async with async_engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
        except Exception as e:
            logger.error(e)
