from typing import Optional

from application.use_cases.parse_by_external_id.parse_pet_by_external_id_use_case import \
    ParsePetByExternalIdUseCase
from domain.enums.source_key import SourceKey


class ParsePetByExternalIdJob:
    def __init__(self, *, uow_factory, registry):
        self._uow_factory = uow_factory
        self._registry = registry

    async def execute(
            self,
            source: SourceKey,
            external_id: str,
    ) -> None:
        uc = ParsePetByExternalIdUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        await uc.execute(source=source, external_id=external_id, )
