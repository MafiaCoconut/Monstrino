from typing import Optional

from icecream import ic
from monstrino_core.domain.value_objects import CharacterGender

from app.use_cases.parse.parse_characters_use_case import ParseCharactersUseCase
from app.use_cases.parse_by_external_id import ParseCharacterByExternalIdUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.source_key import SourceKey


class ParseCharacterByExternalIdJob:
    def __init__(self, *, uow_factory, registry):
        self._uow_factory = uow_factory
        self._registry = registry

    async def execute(
            self,
            source: SourceKey,
            external_id: str,
            gender: CharacterGender
    ) -> None:

        uc = ParseCharacterByExternalIdUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        await uc.execute(source=source, external_id=external_id, gender=gender)
