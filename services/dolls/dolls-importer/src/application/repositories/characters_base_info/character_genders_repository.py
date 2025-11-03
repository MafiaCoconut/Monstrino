from abc import ABC, abstractmethod


class CharacterGendersRepo(ABC):
    @abstractmethod
    async def get_id_by_name(self, name: str) -> int | None: ...
