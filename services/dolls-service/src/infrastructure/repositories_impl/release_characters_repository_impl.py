from application.repositories.release_characters_repository import ReleaseCharactersRepository
from domain.entities.dolls.dolls_image import ReceiveDollsImage
from domain.entities.dolls.release_character import SaveReleaseCharacter
from infrastructure.db.base import async_session_factory
from infrastructure.db.models.dolls_images_orm import DollsImagesORM
from infrastructure.db.models.release_characters_orm import ReleaseCharactersORM


class ReleaseCharactersRepositoryImpl(ReleaseCharactersRepository):
    def __init__(self):
        pass

    async def attach_to_release(self, release_id: int, release_character: SaveReleaseCharacter):
        async with async_session_factory() as session:
            release_character_orm = self._refactor_to_orm(release_id, release_character)
            session.add(release_character_orm)
            await session.commit()
            await session.refresh(release_character_orm)
            return release_character_orm

    @staticmethod
    def _refactor_to_orm(release_id, release_character: SaveReleaseCharacter):
        return ReleaseCharactersORM(
            release_id=release_id,
            character_id=release_character.character_id,
            role=release_character.role,
            position=release_character.position,
        )