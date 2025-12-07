from typing import Protocol, Any

from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_core.shared.enums import ProcessingStates

from app.container_components import Repositories


class ProcessingStatesService:
    async def _set_status(self, repo, parsed_id: int, status: ProcessingStates) -> None:
        await repo.set_processing_state(parsed_id, status)


    async def _set_processed(self, repo, parsed_id: int) -> None:
        await self._set_status(repo, parsed_id, ProcessingStates.PROCESSED)

    async def _set_with_errors(self, repo, parsed_id: int) -> None:
        await self._set_status(repo, parsed_id, ProcessingStates.WITH_ERRORS)

    async def _set_processing(self, repo, parsed_id: int) -> None:
        await self._set_status(repo, parsed_id, ProcessingStates.PROCESSING)



class SeriesProcessingStatesService(ProcessingStatesService):
    async def set_processed(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processed(uow.repos.parsed_series,  parsed_id)

    async def set_with_errors(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_with_errors(uow.repos.parsed_series,  parsed_id)

    async def set_processing(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processing(uow.repos.parsed_series,  parsed_id)


class CharacterProcessingStatesService(ProcessingStatesService):
    async def set_processed(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processed(uow.repos.parsed_character, parsed_id)

    async def set_with_errors(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_with_errors(uow.repos.parsed_character, parsed_id)

    async def set_processing(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processing(uow.repos.parsed_character, parsed_id)


class PetProcessingStatesService(ProcessingStatesService):
    async def set_processed(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processed(uow.repos.parsed_pet, parsed_id)

    async def set_with_errors(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_with_errors(uow.repos.parsed_pet, parsed_id)

    async def set_processing(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processing(uow.repos.parsed_pet, parsed_id)


class ReleaseProcessingStatesService(ProcessingStatesService):
    async def set_processed(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processed(uow.repos.parsed_release, parsed_id)

    async def set_with_errors(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_with_errors(uow.repos.parsed_release, parsed_id)

    async def set_processing(self, uow: UnitOfWorkInterface[Any, Repositories], parsed_id: int) -> None:
        await self._set_processing(uow.repos.parsed_release, parsed_id)
