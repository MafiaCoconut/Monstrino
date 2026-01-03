from monstrino_api.v1.shared.errors import UnsupportedSelectorTypeError

from bootstrap.container_components import ParseJobs
from application.interfaces import ParseCommandInterface
from domain.enums.parse_selector_type_enum import ParseSelectorTypeEnum


class ParsingPetsDispatcher:
    def __init__(self, _parse_jobs: ParseJobs):
        self.parse_jobs = _parse_jobs

    async def dispatch(self, command: ParseCommandInterface) -> None:
        match command.selector_type:
            case ParseSelectorTypeEnum.ALL:
                await self.parse_jobs.pets.execute(source=command.source)
            case ParseSelectorTypeEnum.EXTERNAL_REF:
                await self.parse_jobs.pets_by_external_id.execute(
                    source=command.source,
                    external_id=command.external_ref.value,
                )
            case _:
                raise UnsupportedSelectorTypeError(F"Unsupported selector type: {command.selector_type}")



