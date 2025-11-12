import logging
from icecream import ic
from monstrino_models.dto import ParsedRelease
from monstrino_models.dto.dolls.release import Release, ReleaseCharacter
from monstrino_repositories.repositories import (
    ParsedImagesRepo, SeriesRepo, ImageReferenceOriginRepo,
    ReleasesRepo, ParsedReleasesRepo, CharactersRepo, PetRepo, ReleaseRelationsRepo, ReleaseRelationTypesRepo,
    ReleaseExclusivesRepo, ReleaseTypesRepo, ReleaseCharactersRepo, ReleasePetRepo, ReleaseCharacterRolesRepo
)

from domain.formatters.name_formatter import NameFormatter

logger = logging.getLogger(__name__)


class ProcessReleasesUseCase:
    def __init__(self,
                 parsed_release_repo: ParsedReleasesRepo,
                 characters_repo: CharactersRepo,
                 pets_repo: PetRepo,
                 character_role_repo: ReleaseCharacterRolesRepo,
                 release_character_link_repo: ReleaseCharactersRepo,
                 release_pet_link_repo: ReleasePetRepo,
                 relation_type_repo: ReleaseRelationTypesRepo,
                 release_relation_link_repo: ReleaseRelationsRepo,
                 exclusive_vendor_repo: ReleaseExclusivesRepo,
                 release_type_repo: ReleaseTypesRepo,
                 release_repo: ReleasesRepo,
                 release_series_repo: SeriesRepo,
                 parsed_images_repo: ParsedImagesRepo,
                 image_reference_origin_repo: ImageReferenceOriginRepo
                 ):
        self.parsed_release_repo = parsed_release_repo
        self.characters_repo = characters_repo
        self.pets_repo = pets_repo
        self.character_role_repo = character_role_repo
        self.release_character_link_repo = release_character_link_repo
        self.release_pet_link_repo = release_pet_link_repo
        self.relation_type_repo = relation_type_repo
        self.release_relation_link_repo = release_relation_link_repo
        self.exclusive_vendor_repo = exclusive_vendor_repo
        self.release_type_repo = release_type_repo
        self.release_repo = release_repo
        self.release_series_repo = release_series_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo

    async def execute(self):
        try:
            unprocessed_release = await self.parsed_release_repo.get_unprocessed_release(count=50)
        except Exception as e:
            logger.error(
                f'Unexpected error during fetching unprocessed release: {e}')
            return

        if not unprocessed_release:
            logger.error(f'No unprocessed release found')

        logger.info(
            f'============== Starting processing of {len(unprocessed_release)} release ==============')
        for i, unprocessed_release in enumerate(unprocessed_release):
            if i != 43:
                continue
            logger.info(
                f'Processing release {unprocessed_release.name} (ID: {unprocessed_release.id})')
            release = Release()
            try:
                await self._process_name(unprocessed_release, release)
                release = await self._save_release(release)

                await self._process_characters(unprocessed_release, release)

                await self._process_series_id(unprocessed_release, release)
                print(release.series_id)

            except Exception as e:
                logger.error(
                    f'Error processing release {unprocessed_release.name} (ID: {unprocessed_release.id}): {e}')

        return

    async def _save_release(self, release: Release) -> Release:
        logger.debug(f"Saving processed release {release.name}")
        try:
            release = await self.release_repo.set(release)
            logger.info(f"Successfully saved release: {release.name}")
            return release
        except Exception as e:
            logger.error(f"Failed to save release: {release.name}: {e}")
            raise e

    async def _process_name(self, unprocessed_release: ParsedRelease, release: Release):
        logger.debug(
            f"Processing release name {unprocessed_release.name} (ID: {unprocessed_release.id})")
        release.display_name = unprocessed_release.name
        release.name = NameFormatter.format_name(unprocessed_release.name)

    async def _process_characters(self, unprocessed_release: ParsedRelease, release: Release):
        logger.debug(
            f"Processing release characters {unprocessed_release.name} (ID: {unprocessed_release.id})")
        characters_ids = []
        for character in unprocessed_release.characters:

            character_id = await self.characters_repo.get_id_by_name(NameFormatter.format_name(character['text']))
            characters_ids.append(await self.characters_repo.get_id_by_name(NameFormatter.format_name(character['text'])))

            role_name = "secondary" if len(characters_ids) > 1 else "primary"

            release_character = ReleaseCharacter(
                release_id=release.id,
                character_id=character_id,
                role_id=await self.character_role_repo.get_id_by_name(role_name),
                position=len(characters_ids)-1
            )
            await self.release_character_link_repo.set(release_character)

    # TODO добавить обработку, что релиз может быть в подсерии
    # Возможное решение: добавить новое поле subseries_id в релиз таблицу
    async def _process_series_id(self, unprocessed_release: ParsedRelease, release: Release):
        logger.debug(
            f"Processing release series {unprocessed_release.name} (ID: {unprocessed_release.id})")
        series_name = unprocessed_release.series_name['text']
        series_id = await self.release_series_repo.get_id_by_name(series_name)
        logger.info(f"Set series_id {series_id} for release {release.name}")
        release.series_id = series_id
