import logging
from application.dto.ReleaseCreateDto import ReleaseCreateDto
from application.repositories.release_image_repository import ReleaseImagesRepository
from application.repositories.release_relation_link_repository import ReleaseRelationsRepository
from application.repositories.dolls_release_repository import DollsReleasesRepository
from application.repositories.dolls_series_repository import DollsSeriesRepository
from application.repositories.dolls_types_repository import DollsTypesRepository
from application.repositories.original_characters_repository import OriginalCharactersRepository
from application.repositories.release_character_link_repository import ReleaseCharactersRepository
from domain.entities.dolls.release_image import SaveReleaseImage
from domain.entities.dolls.release_character import SaveReleaseCharacter
from domain.entities.dolls.dolls_release import DollsRelease

logger = logging.getLogger(__name__)


class CreateReleaseUseCase:
    def __init__(
            self,
            release_repo: DollsReleasesRepository,
            release_characters_repo: ReleaseCharactersRepository,
            release_image_repo: ReleaseImagesRepository,
            release_relation_link_repo: ReleaseRelationsRepository,
            dolls_types_repo: DollsTypesRepository,
            dolls_series_repo: DollsSeriesRepository,
            original_characters_repo: OriginalCharactersRepository
    ):
        self.release_repo = release_repo
        self.release_characters_repo = release_characters_repo
        self.release_image_repo = release_image_repo
        self.release_relation_link_repo = release_relation_link_repo
        self.dolls_types_repo = dolls_types_repo
        self.dolls_series_repo = dolls_series_repo
        self.original_characters_repo = original_characters_repo

    async def execute(self, dto: ReleaseCreateDto):
        doll_type = await self.dolls_types_repo.get_by_name(dto.type)
        if not doll_type:
            # TODO Add functionality to create new doll type
            raise ValueError(f"Doll type with name {dto.name} does not exist")

        logger.info(f"Doll type found: {doll_type}")

        doll_series = await self.dolls_series_repo.get_by_name(dto.series)
        if not doll_series:
            # TODO Add functionality to create new series
            raise ValueError(
                f"Doll series with name {dto.series_name} does not exist")

        logger.info(f"Doll series found: {doll_series}")

        characters = [await self.original_characters_repo.get_by_name(character.character_name) for character in dto.characters]
        if not characters:
            # TODO Add functionality to create new original characters
            raise ValueError(
                f"Doll characters with names {[character.name for character in dto.characters]} does not exist")

        logger.info(f"Characters found: {characters}")

        release = await self.release_repo.add(
            DollsRelease(
                type_id=doll_type.id,
                name=dto.name,
                mpn=dto.mpn,
                series_id=doll_series.id,
                year=dto.year,
                description=dto.description,
                link=dto.link,
            )
        )

        release_character = await self.release_characters_repo.attach_to_release(release.id, SaveReleaseCharacter(
            character_id=characters[0].id,
            role=dto.characters[0].role,
            position=dto.characters[0].position,
        ))
        logger.info(f"Release character {release_character}")
        release_image = await self.release_image_repo.attach_to_release(release.id, SaveReleaseImage(
            url=dto.images[0].url,
            is_primary=dto.images[0].is_primary,
            width=dto.images[0].width,
            height=dto.images[0].height,
        ))
        logger.info(f"Release images {release_image}")
