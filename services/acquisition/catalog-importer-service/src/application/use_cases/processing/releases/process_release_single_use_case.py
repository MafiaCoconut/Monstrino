from typing import Any
import logging

from monstrino_core import NameFormatter, EntityNotFoundError, DuplicateEntityError
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import ParsedRelease, Release
from monstrino_testing.fixtures import Repositories

from application.services.common import ReleaseProcessingStatesService, ImageReferenceService
from application.services.releases import CharacterResolverService

logger = logging.getLogger(__name__)

class ProcessReleaseSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            processing_states_svc: ReleaseProcessingStatesService,
            image_reference_svc: ImageReferenceService,
            character_resolver_svc: CharacterResolverService

    ) -> None:
        self.uow_factory = uow_factory
        self.processing_states_svc = processing_states_svc
        self.image_reference_svc = image_reference_svc

        self.character_resolver_svc = character_resolver_svc

    """
    1.  Fetch a single release by ID
    2.  Create release entity
    3.  Format name
    4.  Save release
    5.  Resolve characters
    6.  Resolve series
    7.  Resolve release type
    8.  Resolve multi pack
    9.  Resolve exclusive
    10. Resolve pet
    11. Resolve images
    """

    async def execute(self, parsed_release_id: int) -> None:
        try:
            async with self.uow_factory.create() as uow:
                # Step 1: Fetch a single release by ID
                parsed_release: ParsedRelease = await uow.repos.parsed_release.get_one_by_id(obj_id=parsed_release_id)

                # Step 2-3: Create release entity and format name
                release = Release(
                    name=NameFormatter.format_name(parsed_release.name),
                    display_name=parsed_release.name,
                    year=parsed_release.year,
                    mpn=parsed_release.mpn,
                    description=parsed_release.description,
                    text_from_box=parsed_release.from_the_box_text
                )

                # Step 4: Save release
                release = await uow.repos.release.save(release)

                # Step 5: Resolve characters
                await self.character_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    characters=parsed_release.characters
                )



        except EntityNotFoundError as e:
            logger.error(f"Entity parsed_pet with ID {parsed_release_id} not found")
            await self._handle_error(parsed_release_id)
        except DuplicateEntityError as e:
            logger.error(f"Duplicate entity error for pet ID {parsed_release_id}: {e}")
            await self._handle_error(parsed_release_id)
        except Exception as e:
            logger.exception(f"Error processing parsed_pet ID {parsed_release_id}: {e}", )
            await self._handle_error(parsed_release_id)

    async def _handle_error(self, parsed_character_id: int):
        async with self.uow_factory.create() as uow:
            await self.processing_states_svc.set_with_errors(uow, parsed_character_id)
