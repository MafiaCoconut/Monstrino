from abc import ABC, abstractmethod


class ReleaseCharactersRepository(ABC):
    @abstractmethod
    async def attach_to_release(self, release_id: int, release_character):
        pass
