from typing import Any
import logging
from uuid import UUID

from monstrino_core.domain.services import TitleFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleasePet, Pet

from application.ports import Repositories

logger = logging.getLogger(__name__)


class PetResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            pets_list: list[str]

    ) -> None:
        if pets_list:

            pet_count = 0

            for pet_title in pets_list:
                pet_id = await uow.repos.pet.get_id_by(**{Pet.CODE: TitleFormatter.to_code(pet_title)})

                if pet_id:
                    pet_count += 1
                    release_pet = ReleasePet(
                        release_id=release_id,
                        pet_id=pet_id,
                        position=pet_count,
                        is_uniq_to_release=True if len(
                            pets_list) == 1 else False,
                    )
                    await uow.repos.release_pet.save(release_pet)

                else:
                    logger.error(
                        f"Pet found in parsed data, but not found in pet db: {pet_title}")
