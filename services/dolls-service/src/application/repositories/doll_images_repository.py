from abc import ABC, abstractmethod

from domain.entities.dolls.dolls_image import SaveDollsImage


class DollsImagesRepository(ABC):
    @abstractmethod
    async def attach_to_release(self, release_id: int, dolls_image: SaveDollsImage):
        pass