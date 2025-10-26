from infrastructure.db.base import Base, async_engine
import logging
from infrastructure.db.models.pets_orm import PetsORM
from infrastructure.db.models.character_genders import CharacterGendersORM
from infrastructure.db.models.characters_orm import CharactersORM
from infrastructure.db.models.relation_types_orm import RelationTypesORM
from infrastructure.db.models.release_exclusives_orm import ReleaseExclusivesORM
from infrastructure.db.models.release_types_orm import ReleaseTypesORM
from infrastructure.db.models.release_series_orm import ReleaseSeriesORM
from infrastructure.db.models.releases_orm import ReleasesORM
from infrastructure.db.models.release_images_orm import ReleaseImagesORM
from infrastructure.db.models.release_relations_orm import ReleaseRelationsORM
from infrastructure.db.models.release_characters_orm import ReleaseCharactersORM
from infrastructure.db.models.release_character_roles import ReleaseCharacterRolesORM



logger = logging.getLogger(__name__)

class DBUseCase:
    def __init__(self):
        pass

    async def restartDB(self):
        # await self.delete_db()
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
