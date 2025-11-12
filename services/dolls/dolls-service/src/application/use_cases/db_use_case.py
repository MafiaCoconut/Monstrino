from infrastructure.db.base import Base, async_engine
import logging
# from infrastructure.db.models.pets_orm import PetsORM
# from infrastructure.db.models.character_gender import CharacterGendersORM
# from infrastructure.db.models.characters_orm import CharactersORM
# from infrastructure.db.models.relation_types_orm import RelationTypesORM
# from infrastructure.db.models.exclusive_vendor_orm import ReleaseExclusivesORM
# from infrastructure.db.models.release_type_orm import ReleaseTypesORM
# from infrastructure.db.models.release_series_orm import ReleaseSeriesORM
# from infrastructure.db.models.release_orm import ReleasesORM
# from infrastructure.db.models.release_image_orm import ReleaseImagesORM
# from infrastructure.db.models.release_relation_link_orm import ReleaseRelationsORM
# from infrastructure.db.models.release_character_link_orm import ReleaseCharactersORM
# from infrastructure.db.models.character_role import ReleaseCharacterRolesORM
# from infrastructure.db.models.parsed_pet import ParsedPetsORM
# from infrastructure.db.models.parsed_character import ParsedCharactersORM
# from infrastructure.db.models.parsed_series import ParsedSeriesORM
from infrastructure.db.models.parsed_release_orm import ParsedReleasesORM
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
