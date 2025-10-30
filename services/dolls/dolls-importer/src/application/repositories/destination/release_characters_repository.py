from abc import ABC, abstractmethod
from domain.entities.dolls.release_character import SaveReleaseCharacter


class ReleaseCharactersRepository(ABC):
    @abstractmethod
    async def attach_to_release(self, release_id: int, release_character: SaveReleaseCharacter):
        pass
