from typing import Any
import logging

from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleasePetLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)

class PetResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            pets_list: list[str]

    ) -> None:
        for pet_name in pets_list:
            pet_count = 0
            pet_id = await uow.repos.pet.get_id_by(name=NameFormatter.format_name(pet_name))
            if pet_id:
                pet_count += 1
                await uow.repos.release_pet_link.save(ReleasePetLink(
                    release_id=release_id,
                    pet_id=pet_id,
                    position=pet_count
                ))
            else:
                logger.error(
                    f"Pet found in parsed data, but not found in pet db: {pet_name}"
                )