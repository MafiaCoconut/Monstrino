from abc import ABC, abstractmethod

from domain.entities.new_doll import NewDoll


class DollsRepository(ABC):
    @abstractmethod
    async def set_doll(self, doll: NewDoll):
        pass

    @abstractmethod
    async def get_doll(self, doll_id: int):
        pass
