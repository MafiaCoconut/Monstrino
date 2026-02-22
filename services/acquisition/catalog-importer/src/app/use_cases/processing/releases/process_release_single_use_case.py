from typing import Any
import logging
from uuid import UUID
from icecream import ic
from monstrino_core.domain.errors import EntityNotFoundError, DuplicateEntityError, SourceNotFoundError
from monstrino_core.domain.services import TitleFormatter, TitleFormatter
from monstrino_core.domain.services.catalog import ReleaseTitleFormatter
from monstrino_core.domain.value_objects import ReleaseTypeContentType
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import ParsedRelease, Release, Source
from monstrino_models.enums import EntityName
from monstrino_testing.fixtures import Repositories

from app.services.common import ImageReferenceService
from app.services.common.processing_states_svc import ProcessingStatesService
from app.services.releases import CharacterResolverService, ExclusiveResolverService, SeriesResolverService, \
    ContentTypeResolverService, PackTypeResolverService, TierTypeResolverService, PetResolverService, \
    ReissueRelationResolverService, ImageProcessingService, ExternalRefResolverService
from datetime import datetime
logger = logging.getLogger(__name__)


class ProcessReleaseSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            processing_states_svc: ProcessingStatesService,
            image_reference_svc: ImageReferenceService,

            character_resolver_svc: CharacterResolverService,
            series_resolver_svc: SeriesResolverService,
            exclusive_resolver_svc: ExclusiveResolverService,
            pet_resolver_svc: PetResolverService,
            reissue_relation_svc: ReissueRelationResolverService,

            image_processing_svc: ImageProcessingService,

            content_type_resolver_svc: ContentTypeResolverService,
            pack_type_resolver_svc: PackTypeResolverService,
            tier_type_resolver_svc: TierTypeResolverService,

            external_ref_resolver_svc: ExternalRefResolverService,



    ) -> None:
        self.uow_factory = uow_factory
        self.processing_states_svc = processing_states_svc
        self.image_reference_svc = image_reference_svc

        self.character_resolver_svc = character_resolver_svc
        self.series_resolver_svc = series_resolver_svc
        self.exclusive_resolver_svc = exclusive_resolver_svc
        self.pet_resolver_svc = pet_resolver_svc
        self.reissue_relation_svc = reissue_relation_svc
        self.image_processing_svc = image_processing_svc

        self.content_type_resolver_svc = content_type_resolver_svc
        self.pack_type_resolver_svc = pack_type_resolver_svc
        self.tier_type_resolver_svc = tier_type_resolver_svc

        self.external_ref_resolver_svc = external_ref_resolver_svc

    """
    1.  Fetch a single release by ID
    2.  Create release entity
    3.  Format title
    4.  Save release
    5.  Resolve characters
    6.  Resolve series
    7.  Resolve release type
    8.  Resolve multi pack
    9.  Resolve exclusive
    10. Resolve pet
    11. Resolve reissue of
    12. Resolve images
    13. Resolve external references
    14. Set release as processed
    """

    async def execute(self, parsed_release_id: UUID, sources: list[Source] = None) -> None:
        start = datetime.now()
        ic.disable()
        try:
            async with self.uow_factory.create() as uow:
                # Step 1: Fetch a single release by ID
                parsed_release: ParsedRelease = await uow.repos.parsed_release.get_one_by_id(parsed_release_id)
                if not parsed_release:
                    raise EntityNotFoundError(
                        f"Entity parsed_release with ID {parsed_release_id} not found")

                await self.processing_states_svc.set_processing(uow.repos.parsed_release, parsed_release_id)

                logger.info(
                    f"Processing ParsedRelease ID {parsed_release_id}: {parsed_release.title}")

                # ic(parsed_release)
                # Step 2-3: Create release entity and format title
                release = Release(
                    code=TitleFormatter.to_code(parsed_release.title),
                    title=parsed_release.title,
                    slug=TitleFormatter.to_code(parsed_release.title),
                    year=parsed_release.year,
                    mpn=parsed_release.mpn,
                    description=parsed_release.description_raw,
                    text_from_box=parsed_release.from_the_box_text_raw
                )

                # Step 4: Save release
                existing_release_id = await uow.repos.release.get_id_by(
                    **{Release.TITLE: release.title, Release.YEAR: release.year, Release.MPN: release.mpn}
                )

                if existing_release_id:
                    logger.info(
                        f"Release with title {release.title} already exists with ID {existing_release_id}. Skipping saving.")
                    await self.processing_states_svc.set_processed(uow.repos.parsed_release, parsed_release_id)
                    # TODO In future here should be checked if new record have values that not in existing one and update accordingly
                    return

                release = await uow.repos.release.save(release)

                release.slug = ReleaseTitleFormatter.to_slug(
                    code=release.code, obj_id=release.id)
                await uow.repos.release.update({Release.ID: release.id}, {Release.SLUG: release.slug})

                ic(release.id)
                # ic(release)
                ic('==================================================')
                ic("Resolve characters")
                # Step 5: Resolve characters
                await self.character_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    characters=parsed_release.characters_raw
                )
                ic('==================================================')
                ic("Resolve series")
                # Step 6: Resolve series
                await self.series_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    series_list=parsed_release.series_raw
                )
                ic('==================================================')
                ic("Resolve content type")
                # Step 7: Resolve release type
                await self.content_type_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    type_list=parsed_release.content_type_raw,
                    character_count=len(
                        parsed_release.characters_raw) if parsed_release.characters_raw is not None else 0,
                    pet_count=len(
                        parsed_release.pet_title_raw) if parsed_release.pet_title_raw is not None else 0
                )
                ic('==================================================')
                ic("Resolve pack type")
                await self.pack_type_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    pack_type_list=parsed_release.pack_type_raw,
                    release_character_count=len(
                        parsed_release.characters_raw) if parsed_release.characters_raw is not None else 0,
                )
                ic('==================================================')
                ic("Resolve tier type")
                if sources is None:
                    source = await uow.repos.source.get_one_by(id=parsed_release.source_id)
                else:
                    source = next((s for s in sources if s.id == parsed_release.source_id), None)
                if source:
                    await self.tier_type_resolver_svc.resolve(
                        uow=uow,
                        release_id=release.id,
                        tier_type=parsed_release.tier_type_raw,
                        release_code=release.code,
                        release_source_code=source.code,
                        has_deluxe_packaging=False
                    )
                else:
                    raise SourceNotFoundError(
                        f"Entity source with ID {parsed_release.source_id} not found")
                ic('==================================================')
                ic("Resolve exclusives")
                # Step 9: Resolve exclusives
                await self.exclusive_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    exclusive_list=parsed_release.exclusive_vendor_raw
                )
                ic('==================================================')
                ic("Resolve pets")
                # Step 10: Resolve pets
                await self.pet_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    pets_list=parsed_release.pet_title_raw
                )
                ic('==================================================')
                ic("Resolve reissue")
                # Step 11: Resolve reissue
                await self.reissue_relation_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    reissue_list=parsed_release.reissue_of_raw
                )
                ic('==================================================')
                ic("Resolve images")
                # Step 12: Resolve images
                await self.image_processing_svc.process_images(
                    uow=uow,
                    release_id=release.id,
                    primary_image=parsed_release.primary_image,
                    other_images_list=parsed_release.images,
                    image_reference_svc=self.image_reference_svc
                )
                ic('==================================================')
                ic("Resolve external references")
                # Step 13: Resolve external references
                await self.external_ref_resolver_svc.resolve(
                    uow=uow,
                    release_id=release.id,
                    source_id=parsed_release.source_id,
                    external_id=parsed_release.external_id
                )

                # Step 14: Set release as processed
                await self.processing_states_svc.set_processed(uow.repos.parsed_release, parsed_release_id)
                logger.info(f"Successfully processed ParsedRelease ID {parsed_release_id}: {release.title} in {(datetime.now() - start).total_seconds()} seconds")

        except EntityNotFoundError as e:
            logger.error(
                f"Entity parsed_release with ID {parsed_release_id} not found")
            await self._handle_error(parsed_release_id)
        except DuplicateEntityError as e:
            logger.error(
                f"Duplicate entity error for release ID {parsed_release_id}: {e}")
            await self._handle_error(parsed_release_id)
        except Exception as e:
            logger.exception(
                f"Error processing parsed_release ID {parsed_release_id}: {e}", )
            await self._handle_error(parsed_release_id)

    async def _handle_error(self, parsed_release_id: UUID):
        async with self.uow_factory.create() as uow:
            ...
            # await self.processing_states_svc.set_with_errors(uow.repos.parsed_release, parsed_release_id)
