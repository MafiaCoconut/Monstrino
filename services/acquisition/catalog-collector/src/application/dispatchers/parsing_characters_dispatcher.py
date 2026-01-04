from icecream import ic
from monstrino_core.domain.value_objects import CharacterGender

from domain.entities import ParseJobs
from application.interfaces import ParseCommandInterface
from domain.entities.refs import ExternalRef
from domain.enums.parse_selector_type_enum import ParseSelectorTypeEnum


class ParsingCharactersDispatcher:
    def __init__(self, _parse_jobs: ParseJobs):
        self.parse_jobs = _parse_jobs

    async def dispatch(self, command: ParseCommandInterface) -> None:
        match command.selector_type:
            case ParseSelectorTypeEnum.ALL:
                await self.parse_jobs.characters.execute(source=command.source)
            case ParseSelectorTypeEnum.EXTERNAL_REF:
                await self.parse_jobs.character_by_external_id.execute(
                    source=command.source,
                    external_id=command.external_ref.value,
                    gender=self._validate_external_ref_gender(command.external_ref),
                )
            case _:
                raise ValueError(F"Unsupported selector type: {command.selector_type}")

    def _validate_external_ref_gender(self, external_ref: ExternalRef) -> CharacterGender:
        gender = external_ref.qualifiers.get('gender', None)
        return CharacterGender(gender)


