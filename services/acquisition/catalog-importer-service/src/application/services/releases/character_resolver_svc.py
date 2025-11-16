
from monstrino_core import NameFormatter
from monstrino_models.dto import ParsedRelease


class CharacterResolverService:
    async def resolve(self, uow, parsed: ParsedRelease) -> None:
        ids: list[int] = []
        for ch_name in parsed.character or []:
            name = NameFormatter.format_name(ch_name)
            ch_id = await uow.repos.character.get_id_by_name(name)
            if ch_id:
                ids.append(ch_id)
        parsed.character_ids = ids
