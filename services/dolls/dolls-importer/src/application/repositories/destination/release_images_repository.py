from abc import ABC, abstractmethod


class ReleaseImagesRepository(ABC):
    @abstractmethod
    async def attach_to_release(self, release_id: int, release_image):
        pass