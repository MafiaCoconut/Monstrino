from typing import Optional

from application.use_cases.parse.parse_characters_use_case import ParseCharactersUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey


class ParseCharactersJob:
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
        uc = ParseCharactersUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        scope = scope or ParseScope()
        await uc.execute(source=source, scope=scope, batch_size=batch_size, limit=limit)
