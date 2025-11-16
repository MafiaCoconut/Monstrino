import logging
from typing import Protocol

from monstrino_core import NameFormatter, ProcessingStates
from monstrino_models.dto import ParsedCharacter, Character

from application.services.character import GenderResolverService
from application.services.common import ImageReferenceService, CharacterProcessingStatesService

logger = logging.getLogger(__name__)


class UnitOfWork(Protocol):
    """Protocol for UnitOfWork used in tests and app."""

    repos: object

    async def __aenter__(self): ...
    async def __aexit__(self, exc_type, exc, tb): ...


class ProcessSingleCharacterUseCase:
    """Use case for processing a single character from parsed data."""

    def __init__(
        self,
        uow_factory,
        gender_resolver_svc: GenderResolverService,
        image_reference_svc: ImageReferenceService,
        processing_states_svc: CharacterProcessingStatesService,
    ):
        self.uow_factory = uow_factory
        self.gender_resolver_svc = gender_resolver_svc
        self.image_reference_svc = image_reference_svc
        self.processing_states_svc = processing_states_svc

    """
    1. Take parsed character by ID
    2. Format name
    3. Save Character entity
    4. Set image to process
    5. Mark parsed character as processed
    6. If any error occurs, mark parsed character as with_errors
    """

    async def execute(self, parsed_character_id: int) -> None:
        async with self.uow_factory.create() as uow:
            parsed: ParsedCharacter = await uow.repos.parsed_character.get_one_by(id=parsed_character_id)
            if not parsed:
                await self.processing_states_svc.set_with_errors(uow, parsed_character_id)
                return

            try:
                character = Character(
                    name=NameFormatter.format_name(parsed.name),
                    display_name=parsed.name,
                    primary_image=parsed.primary_image,
                    description=parsed.description,
                )

                # Resolve gender
                await self.gender_resolver_svc.resolve(uow, parsed, character)

                # Build Character entity

                saved = await uow.repos.character.save(character)

                # Image processing
                await self.image_reference_svc.set_image_to_process(
                    uow=uow,
                    table="character",
                    column="primary_image",
                    record=saved,
                )

                # Final state
                await self.processing_states_svc.set_processed(uow, parsed.id)

            except Exception as exc:  # noqa: BLE001
                logger.error("Error while processing character %s: %s", parsed_character_id, exc)
                await self.processing_states_svc.set_with_errors(uow, parsed.id)
