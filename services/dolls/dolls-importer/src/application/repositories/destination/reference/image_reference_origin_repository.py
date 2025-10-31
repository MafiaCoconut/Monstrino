from abc import ABC, abstractmethod


class ImageReferenceOriginRepository(ABC):
    @abstractmethod
    async def get_id_by_table_and_column(self, table: str, column: str) -> int | None: ...
