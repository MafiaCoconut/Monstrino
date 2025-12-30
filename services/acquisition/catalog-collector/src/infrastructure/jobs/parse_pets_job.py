from typing import Optional

from application.use_cases.parse import ParsePetsUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.website_key import SourceKey


class ParsePetsJob:
    def __init__(self, *, uow_factory, registry):
        self._uow_factory = uow_factory
        self._registry = registry

    async def execute(
            self,
            source: SourceKey,
            batch_size: int = 10,
            limit: int = 9999999,
            scope: Optional[ParseScope] = None
    ) -> None:
        uc = ParsePetsUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        scope = scope or ParseScope()
        await uc.execute(source=source, scope=scope, batch_size=batch_size, limit=limit)
