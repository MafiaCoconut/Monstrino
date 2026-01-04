from typing import Any

from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedPet, CharacterPetOwnership, Pet

from application.ports import Repositories


class OwnerResolverService:
    """Service that resolves owner_id for a parsed pet."""

    """
    1. Get owner id by owner name
    2. Create CharacterPetOwnership entity
    3. Save CharacterPetOwnership entity
    """

    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            owner_name: str,
            pet_id: int
    ) -> None:
        owner_id = await uow.repos.character.get_id_by(name=NameFormatter.format_name(owner_name))

        rel_link = CharacterPetOwnership(
            character_id=owner_id,
            pet_id=pet_id,
        )

        await uow.repos.character_pet_ownership.save(rel_link)