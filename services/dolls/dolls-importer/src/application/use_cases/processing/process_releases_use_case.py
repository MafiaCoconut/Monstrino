import logging
from icecream import ic
from monstrino_models.dto import ParsedRelease
from monstrino_models.dto.dolls.releases import Release, ReleaseCharacter
from monstrino_repositories.repositories import (
    ParsedImagesRepo, SeriesRepo, ImageReferenceOriginRepo, \
    ReleasesRepo, ParsedReleasesRepo, CharactersRepo, PetsRepo, ReleaseRelationsRepo, ReleaseRelationTypesRepo,
    ReleaseExclusivesRepo, ReleaseTypesRepo, ReleaseCharactersRepo, ReleasePetsRepo, ReleaseCharacterRolesRepo
)

from domain.formatters.name_formatter import NameFormatter

logger = logging.getLogger(__name__)


class ProcessReleasesUseCase:
    def __init__(self,
                 parsed_releases_repo: ParsedReleasesRepo,
                 characters_repo: CharactersRepo,
                 pets_repo: PetsRepo,
                 release_character_roles_repo: ReleaseCharacterRolesRepo,
                 release_characters_repo: ReleaseCharactersRepo,
                 release_pets_repo: ReleasePetsRepo,
                 release_relation_types_repo: ReleaseRelationTypesRepo,
                 release_relations_repo: ReleaseRelationsRepo,
                 release_exclusives_repo: ReleaseExclusivesRepo,
                 release_types_repo: ReleaseTypesRepo,
                 releases_repo: ReleasesRepo,
                 release_series_repo: SeriesRepo,
                 parsed_images_repo: ParsedImagesRepo,
                 image_reference_origin_repo: ImageReferenceOriginRepo
                 ):
        self.parsed_releases_repo = parsed_releases_repo
        self.characters_repo = characters_repo
        self.pets_repo = pets_repo
        self.release_character_roles_repo = release_character_roles_repo
        self.release_characters_repo = release_characters_repo
        self.release_pets_repo = release_pets_repo
        self.release_relation_types_repo = release_relation_types_repo
        self.release_relations_repo = release_relations_repo
        self.release_exclusives_repo = release_exclusives_repo
        self.release_types_repo = release_types_repo
        self.releases_repo = releases_repo
        self.release_series_repo = release_series_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo

    async def execute(self):
        try:
            unprocessed_releases = await self.parsed_releases_repo.get_unprocessed_releases(count=50)
        except Exception as e:
            logger.error(f'Unexpected error during fetching unprocessed releases: {e}')
            return

        if not unprocessed_releases:
            logger.error(f'No unprocessed releases found')

        logger.info(f'============== Starting processing of {len(unprocessed_releases)} releases ==============')
        for i, unprocessed_release in enumerate(unprocessed_releases):
            if i != 43:
                continue
            logger.info(f'Processing release {unprocessed_release.name} (ID: {unprocessed_release.id})')
            release = Release()
            try:
                await self._process_name(unprocessed_release, release)
                release = await self._save_release(release)

                await self._process_characters(unprocessed_release, release)

                await self._process_series_id(unprocessed_release, release)
                print(release.series_id)

            except Exception as e:
                logger.error(f'Error processing release {unprocessed_release.name} (ID: {unprocessed_release.id}): {e}')

        return

    async def _save_release(self, release: Release) -> Release:
        logger.debug(f"Saving processed release {release.name}")
        try:
            release = await self.releases_repo.set(release)
            logger.info(f"Successfully saved release: {release.name}")
            return release
        except Exception as e:
            logger.error(f"Failed to save release: {release.name}: {e}")
            raise e


    async def _process_name(self, unprocessed_release: ParsedRelease, release: Release):
        logger.debug(f"Processing releases name {unprocessed_release.name} (ID: {unprocessed_release.id})")
        release.display_name = unprocessed_release.name
        release.name = NameFormatter.format_name(unprocessed_release.name)

    async def _process_characters(self, unprocessed_release: ParsedRelease, release: Release):
        logger.debug(f"Processing releases characters {unprocessed_release.name} (ID: {unprocessed_release.id})")
        characters_ids = []
        for character in unprocessed_release.characters:

            character_id = await self.characters_repo.get_id_by_name(NameFormatter.format_name(character['text']))
            characters_ids.append(await self.characters_repo.get_id_by_name(NameFormatter.format_name(character['text'])))

            role_name = "secondary" if len(characters_ids) > 1 else "primary"

            release_character = ReleaseCharacter(
                release_id=release.id,
                character_id=character_id,
                role_id=await self.release_character_roles_repo.get_id_by_name(role_name),
                position=len(characters_ids)-1
            )
            await self.release_characters_repo.set(release_character)

    # TODO добавить обработку, что релиз может быть в подсерии
    # Возможное решение: добавить новое поле subseries_id в релиз таблицу
    async def _process_series_id(self, unprocessed_release: ParsedRelease, release: Release):
        logger.debug(f"Processing releases series {unprocessed_release.name} (ID: {unprocessed_release.id})")
        series_name = unprocessed_release.series_name['text']
        series_id = await self.release_series_repo.get_id_by_name(series_name)
        logger.info(f"Set series_id {series_id} for release {release.name}")
        release.series_id = series_id
