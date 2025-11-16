
import logging

from monstrino_core import NameFormatter, ProcessingStates
from monstrino_models.dto import ParsedPet, Pet

logger = logging.getLogger(__name__)


class ProcessSinglePetUseCase:
    """Use case for processing a single pet from parsed data."""

    def __init__(
        self,
        uow_factory,
        owner_resolver_svc,
        image_reference_svc,
        processing_states_svc,
    ):
        self.uow_factory = uow_factory
        self.owner_resolver_svc = owner_resolver_svc
        self.image_reference_svc = image_reference_svc
        self.processing_states_svc = processing_states_svc

    async def execute(self, parsed_pet_id: int) -> None:
        async with self.uow_factory.create() as uow:
            parsed: ParsedPet | None = await uow.repos.parsed_pets.get_one_or_none(
                id=parsed_pet_id
            )
            if not parsed:
                await self.processing_states_svc.set_with_errors(uow, parsed_pet_id)
                return

            try:
                # Format name
                parsed.display_name = parsed.name
                parsed.name = NameFormatter.format_name(parsed.name)

                # Resolve owner
                await self.owner_resolver_svc.resolve(uow, parsed)

                pet = Pet(
                    name=parsed.name,
                    display_name=parsed.display_name,
                    owner_id=parsed.owner_id,
                    primary_image=parsed.primary_image,
                )

                saved = await uow.repos.pets.save(pet)

                await self.image_reference_svc.set_image_to_process(
                    uow=uow,
                    table="pets",
                    column="primary_image",
                    record=saved,
                )

                await self.processing_states_svc.set_processed(uow, parsed.id)

            except Exception as exc:  # noqa: BLE001
                logger.error("Error while processing pet %s: %s", parsed_pet_id, exc)
                await self.processing_states_svc.set_with_errors(uow, parsed.id)
