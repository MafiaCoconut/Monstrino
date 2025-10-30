from application.repositories.destination.release_images_repository import ReleaseImagesRepository
from infrastructure.db.base import async_session_factory


class ReleaseImagesRepositoryImpl(ReleaseImagesRepository):
    async def attach_to_release(self, release_id: int, release_image):
        async with async_session_factory() as session:
            release_image_orm = self._refactor_to_orm(release_id, release_image)
            session.add(release_image_orm)
            await session.commit()
            await session.refresh(release_image_orm)
            return release_image_orm

    # @staticmethod
    # def _refactor_to_orm(release_id, release_image: SaveReleaseImage):
    #     return ReleaseImagesORM(
    #         release_id=release_id,
    #         url=release_image.url,
    #         is_primary=release_image.is_primary,
    #         width=release_image.width,
    #         height=release_image.height,
    #     )