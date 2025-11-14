from abc import ABC, abstractmethod

from domain.entities.dolls.release_image import SaveReleaseImage


class ReleaseImagesRepository(ABC):
    @abstractmethod
    async def attach_to_release(self, release_id: int, release_image: SaveReleaseImage):
        pass