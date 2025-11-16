from monstrino_core import NameFormatter
from monstrino_models.dto import ParsedPet


class OwnerResolverService:
    """Service that resolves owner_id for a parsed pet."""

    async def resolve(self, uow, parsed: ParsedPet) -> None:
        name = NameFormatter.format_name(parsed.owner_name)
        owner_id = await uow.repos.character.get_id_by_name(name)
        parsed.owner_id = owner_id
