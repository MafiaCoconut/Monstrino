
import logging

from monstrino_core import NameFormatter
from monstrino_models.dto import ParsedRelease, Release

logger = logging.getLogger(__name__)


class ProcessSingleReleaseUseCase:
    """Use case for processing a single release from parsed data."""

    def __init__(
        self,
        uow_factory,
        character_resolver_svc,
        series_resolver_svc,
        type_resolver_svc,
        exclusive_resolver_svc,
        reissue_relation_svc,
        pet_resolver_svc,
        image_processing_svc,
        processing_states_svc,
    ):
        self.uow_factory = uow_factory
        self.character_resolver_svc = character_resolver_svc
        self.series_resolver_svc = series_resolver_svc
        self.type_resolver_svc = type_resolver_svc
        self.exclusive_resolver_svc = exclusive_resolver_svc
        self.reissue_relation_svc = reissue_relation_svc
        self.pet_resolver_svc = pet_resolver_svc
        self.image_processing_svc = image_processing_svc
        self.processing_states_svc = processing_states_svc

    async def execute(self, parsed_release_id: int) -> None:
        async with self.uow_factory.create() as uow:
            parsed: ParsedRelease | None = await uow.repos.parsed_releases.get_one_or_none(
                id=parsed_release_id
            )
            if not parsed:
                await self.processing_states_svc.set_with_errors(uow, parsed_release_id)
                return

            try:
                # 1. Format name
                parsed.display_name = parsed.name
                parsed.name = NameFormatter.format_name(parsed.name)

                # 2. Characters
                await self.character_resolver_svc.resolve(uow, parsed)

                # 3. Series
                await self.series_resolver_svc.resolve(uow, parsed)

                # 4–5. Types and multipack
                await self.type_resolver_svc.resolve(uow, parsed)

                # 6. Year already in parsed

                # 7. Exclusives
                await self.exclusive_resolver_svc.resolve(uow, parsed)

                # 8. Reissue relations
                await self.reissue_relation_svc.resolve(uow, parsed)

                # 9. MPN already in parsed

                # 10. Pets
                await self.pet_resolver_svc.resolve(uow, parsed)

                # 11, 12: description & text_from_box already in parsed

                release = Release(
                    name=parsed.name,
                    display_name=parsed.display_name,
                    description=parsed.description,
                    year=parsed.year,
                    mpn=parsed.mpn,
                    from_the_box=parsed.text_from_box,
                    type_ids=parsed.type_ids,
                    exclusive_ids=parsed.exclusive_ids,
                    series_id=parsed.series_id,
                )

                saved_release = await uow.repos.releases.save(release)

                # 13. Images
                await self.image_processing_svc.process_images(uow, parsed, saved_release)

                await self.processing_states_svc.set_processed(uow, parsed.id)

            except Exception as exc:  # noqa: BLE001
                logger.error("Error while processing release %s: %s", parsed_release_id, exc)
                await self.processing_states_svc.set_with_errors(uow, parsed.id)
