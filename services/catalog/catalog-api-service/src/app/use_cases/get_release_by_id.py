from typing import Any, Optional
import logging

from icecream import ic
from monstrino_core.domain.errors import EntityNotFoundError
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Release, ReleaseImage, ReleaseCharacter, Character, ReleasePet, ReleaseTypeLink

from domain.entities.release import *
from src.app.ports import Repositories
from src.app.queries.get_release_by_id import GetReleaseByIdDTO
from src.domain.entities import *

logger = logging.getLogger(__name__)

class GetReleaseByIdUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],

    ):
        self.uow_factory = uow_factory

    async def execute(self, query: GetReleaseByIdDTO):
        """


        Example
        {
          "id": 123,
          "include": {
            "series": true,
            "characters": true,
            "images": { "only_primary": false }
          },
          "fields": {
            "include": ["id", "name", "release_date", "series", "characters", "images"]
          },
          "context": { "locale": "en", "timezone": "Europe/Berlin" }
        }

        :param query:
        :return:
        """
        ic(query)
        release_id = query.release_id
        async with self.uow_factory.create() as uow:
            release = await uow.repos.release.get_one_by(**{Release.ID: release_id})
            if release is None:
                logger.error(f"No release found for release ID = ({release_id})")
                # raise EntityNotFoundError(f"Release with ID {release_id} not found.")

            full_release = ReleaseFull(
                title=release.name,
                year=release.year,
                mpn=release.mpn,
                description=release.description,
                text_from_box=release.text_from_box,
            )

            # ========== Characters ==========
            if query.include.characters:
                characters_list = await self._get_characters(uow, release_id)
                if characters_list:
                    ic(characters_list)

                full_release.characters=characters_list

            # ========== Characters ==========
            if query.include.pets:
                pets_list = await self._get_pets(uow, release_id)
                if pets_list:
                    ic(pets_list)

                full_release.pets = pets_list

            # ========== Images ==========
            if query.include.images:
                release_image_list = await self._get_images(uow, release_id)
                if release_image_list:
                    ic(release_image_list)

                full_release.images = release_image_list

            # ========== Exclusives ==========
            if query.include.exclusives:
                release_exclusives_list = await self._get_exclusives(uow, release_id)
                if release_exclusives_list:
                    ic(release_exclusives_list)

                full_release.exclusives = release_exclusives_list

            # ========== Series ==========
            if query.include.series:
                series_list = await self._get_series(uow, release_id)
                if series_list:
                    ic(series_list)

                full_release.series = series_list

            # ========== Types ==========
            if query.include.types:
                types_list = await self._get_types(uow, release_id)
                if types_list:
                    ic(types_list)

                full_release.types = types_list

            # ========== Relations ==========
            if query.include.relations:
                relations_list = await self._get_relations(uow, release_id)
                if relations_list:
                    ic(relations_list)

                full_release.relations = relations_list

        return full_release


    async def _get_characters(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int
    ) -> list[Optional[RCharacter]]:
        release_characters = await uow.repos.release_character.get_many_by(**{ReleaseCharacter.RELEASE_ID: release_id})
        if not release_characters:
            logger.error(f"No characters found for release ID = ({release_id})")
        characters_list = []
        for release_character in release_characters:
            character = await uow.repos.character.get_one_by_id(release_character.character_id)

            role = await uow.repos.character_role.get_one_by_id(release_character.role_id)

            if character and role:
                characters_list.append(
                    RCharacter(
                        name=character.name,
                        display_name=character.display_name,
                        gender=character.gender,
                        description=character.description,
                        primary_image=character.primary_image,
                        role=role.name
                    )
                )
        return characters_list

    async def _get_pets(self, uow: UnitOfWorkInterface[Any, Repositories], release_id: int) -> list[RPet]:
        release_pets = await uow.repos.release_pet.get_many_by(**{ReleasePet.RELEASE_ID: release_id})
        if not release_pets:
            logger.error(f"No pets found for release ID = ({release_id})")
        pets_list = []
        for release_pet in release_pets:
            pet = await uow.repos.pet.get_one_by_id(release_pet.pet_id)
            if pet:
                pets_list.append(
                    RPet(
                        name=pet.name,
                        display_name=pet.display_name,
                        is_uniq_to_release=release_pet.is_uniq_to_release,
                        position=release_pet.position,
                        notes=release_pet.notes,
                        description=pet.description
                    )
                )
        return pets_list

    async def _get_types(self, uow: UnitOfWorkInterface[Any, Repositories], release_id: int) -> list[RType]:
        release_types = await uow.repos.release_type_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release_id})
        if not release_types:
            logger.error(f"No types found for release ID = ({release_id})")
        types_list = []
        for release_type in release_types:
            r_type = await uow.repos.release_type.get_one_by_id(release_type.type_id)
            if r_type:
                types_list.append(
                    RType(
                        name=r_type.name,
                        display_name=r_type.display_name,
                        category=r_type.category
                    )
                )
        return types_list

    async def _get_series(self, uow: UnitOfWorkInterface[Any, Repositories], release_id: int) -> list[RSeries]:
        # Implementation for fetching series associated with the release
        release_series_link = await uow.repos.release_series_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release_id})
        if not release_series_link:
            logger.error(f"No series_link found for release ID = ({release_id})")
        series_list = []
        for series_link in release_series_link:
            series = await uow.repos.series.get_one_by_id(series_link.series_id)
            if series:
                series_list.append(
                    RSeries(
                        name=series.display_name,
                        type=series.series_type
                    )
                )
        return series_list

    async def _get_images(self, uow: UnitOfWorkInterface[Any, Repositories], release_id: int) -> list[RImage]:
        release_images = await uow.repos.release_image.get_many_by(**{ReleaseImage.RELEASE_ID: release_id})
        if not release_images:
            logger.error(f"No images found for release ID = ({release_id})")
        images_list = []
        for release_image in release_images:
            images_list.append(
                RImage(
                    url=release_image.image_url,
                    is_primary=release_image.is_primary
                )
            )
        return images_list

    async def _get_exclusives(self, uow: UnitOfWorkInterface[Any, Repositories], release_id: int) -> list[RExclusive]:
        # Implementation for fetching exclusives associated with the release
        release_exclusive_link = await uow.repos.release_exclusive_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release_id})
        if not release_exclusive_link:
            logger.error(f"No exclusive_link found for release ID = ({release_id})")
        exclusives_list = []
        for exclusive_link in release_exclusive_link:
            exclusive = await uow.repos.exclusive_vendor.get_one_by_id(exclusive_link.exclusive_id)
            if exclusive:
                exclusives_list.append(
                    RExclusive(
                        name=exclusive.name,
                        display_name=exclusive.display_name,
                        description=exclusive.description,
                        image_url=exclusive.image_url,
                    )
                )
        return exclusives_list

    async def _get_relations(self, uow: UnitOfWorkInterface[Any, Repositories], release_id: int) -> list[RRelation]:
        release_relation_link = await uow.repos.release_relation_link.get_many_by(
            **{ReleaseTypeLink.RELEASE_ID: release_id}
        )
        if not release_relation_link:
            logger.error(f"No relation_link found for release ID = ({release_id})")
        relation_list = []
        for relation_link in release_relation_link:
            relation_type = await uow.repos.relation_type.get_one_by_id(relation_link.relation_type_id)
            if relation_type:
                relation_list.append(
                    RRelation(
                        related_release_id=relation_link.related_release_id,
                        relation_type=relation_type.display_name,
                        note=relation_link.note,
                    )
                )
        return relation_list

