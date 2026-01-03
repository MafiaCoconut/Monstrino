from typing import Optional
from typing import Optional

from application.use_cases.parse_by_external_id import ParseReleaseByExternalIdUseCase
from domain.enums.source_key import SourceKey


class ParseReleaseByExternalIdJob:
    def __init__(self, *, uow_factory, registry):
        self._uow_factory = uow_factory
        self._registry = registry

    async def execute(
            self,
            source: SourceKey,
            external_id: str,
    ) -> None:
        uc = ParseReleaseByExternalIdUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        await uc.execute(source=source, external_id=external_id)
