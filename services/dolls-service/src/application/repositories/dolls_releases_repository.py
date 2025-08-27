from abc import ABC, abstractmethod
from domain.entities.dolls_release import DollsRelease


class DollsReleasesRepository(ABC):
    def __init__(self):
        pass

    @abstractmethod
    async def save(self, release: DollsRelease) -> int:
        pass
