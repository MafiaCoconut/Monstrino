from typing import Any
from uuid import UUID
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedPet, CharacterPetOwnership, Pet, Character

from application.ports import Repositories


class OwnerResolverService:
    """Service that resolves owner_id for a parsed pet."""

    """
    1. Get owner id by owner title
    2. Create CharacterPetOwnership entity
    3. Save CharacterPetOwnership entity
    """

    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            owner_title: str,
            pet_id: UUID
    ) -> None:
        owner_id = await uow.repos.character.get_id_by(**{Character.CODE: TitleFormatter.to_code(owner_title)})

        rel_link = CharacterPetOwnership(
            character_id=owner_id,
            pet_id=pet_id,
        )

        await uow.repos.character_pet_ownership.save(rel_link)