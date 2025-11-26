from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedCharacter, Character

from app.container_components import Repositories
from sqlalchemy.ext.asyncio import AsyncSession

class GenderResolverService:
    """Service that resolves gender_id for a parsed character."""

    async def resolve(
            self,
            uow: UnitOfWorkInterface[AsyncSession, Repositories],
            parsed: ParsedCharacter,
            character: Character
    ) -> None:
        gender_id = await uow.repos.character_gender.get_id_by(name=NameFormatter.format_name(parsed.gender))
        character.gender_id = gender_id
