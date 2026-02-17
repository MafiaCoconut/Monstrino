from typing import Optional

from app.use_cases.parse_by_external_id.parse_series_by_external_id_use_case import \
    ParseSeriesByExternalIdUseCase
from domain.enums.source_key import SourceKey


class ParseSeriesByExternalIdJob:
    def __init__(self, *, uow_factory, registry):
        self._uow_factory = uow_factory
        self._registry = registry

    async def execute(
            self,
            source: SourceKey,
            external_id: str,
    ) -> None:
        uc = ParseSeriesByExternalIdUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        await uc.execute(source=source, external_id=external_id)
