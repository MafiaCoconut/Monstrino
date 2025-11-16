from monstrino_core import ProcessingStates


class SeriesProcessingStatesService:
    async def set_processed(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_series.set_processing_state(parsed_id, ProcessingStates.PROCESSED)

    async def set_with_errors(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_series.set_processing_state(parsed_id, ProcessingStates.WITH_ERRORS)


class CharacterProcessingStatesService:
    async def set_processed(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_character.set_processing_state(parsed_id, ProcessingStates.PROCESSED)

    async def set_with_errors(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_character.set_processing_state(parsed_id, ProcessingStates.WITH_ERRORS)

class PetProcessingStatesService:
    async def set_processed(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_pet.set_processing_state(parsed_id, ProcessingStates.PROCESSED)

    async def set_with_errors(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_pet.set_processing_state(parsed_id, ProcessingStates.WITH_ERRORS)


class ReleaseProcessingStatesService:
    async def set_processed(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_release.set_processing_state(parsed_id, ProcessingStates.PROCESSED)

    async def set_with_errors(self, uow, parsed_id: int) -> None:
        await uow.repos.parsed_release.set_processing_state(parsed_id, ProcessingStates.WITH_ERRORS)
