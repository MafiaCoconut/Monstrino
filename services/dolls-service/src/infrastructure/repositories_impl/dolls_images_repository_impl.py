from application.repositories.doll_images_repository import DollsImagesRepository
from domain.entities.dolls.dolls_image import ReceiveDollsImage, SaveDollsImage
from infrastructure.db.base import async_session_factory
from infrastructure.db.models.dolls_images_orm import DollsImagesORM


class DollsImagesRepositoryImpl(DollsImagesRepository):
    async def attach_to_release(self, release_id: int, dolls_image: SaveDollsImage):
        async with async_session_factory() as session:
            dolls_image_orm = self._refactor_to_orm(release_id, dolls_image)
            session.add(dolls_image_orm)
            await session.commit()
            await session.refresh(dolls_image_orm)
            return dolls_image_orm

    @staticmethod
    def _refactor_to_orm(release_id, dolls_image: SaveDollsImage):
        return DollsImagesORM(
            release_id=release_id,
            url=dolls_image.url,
            is_primary=dolls_image.is_primary,
            width=dolls_image.width,
            height=dolls_image.height,
        )