from icecream import ic
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedCharacter, Character

from app.container_components import Repositories
from sqlalchemy.ext.asyncio import AsyncSession

class GenderResolverService:
    """Service that resolves gender_id for a parsed character."""

    async def resolve(
            self,
            parsed: ParsedCharacter,
            character: Character
    ) -> None:
        gender = parsed.gender
        if gender in ["Ghoul", "ghoul"]:
            character.gender = CharacterGender.GHOUL
        elif gender in ["Manster", "manster"]:
            character.gender = CharacterGender.MANSTER
        else:
            raise ValueError(f"Character: {character.display_name} has UNKNOWN GENDER: {gender}")
