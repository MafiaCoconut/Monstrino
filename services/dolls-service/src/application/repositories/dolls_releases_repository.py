from abc import ABC, abstractmethod

from application.dto.ReleaseCreateDto import ReleaseCreateDto
from domain.entities.dolls_release import DollsRelease


class DollsReleasesRepository(ABC):
    @abstractmethod
    async def add(self, dolls_release: DollsRelease):
        pass
    # @abstractmethod
    # async def get_all(self):
    #     pass
    #
    # @abstractmethod
    # async def add(self, name: str, description: str, display_name: str):
    #     pass
    #
    # @abstractmethod
    # async def get(self, type_id: int):
    #     pass
    #
