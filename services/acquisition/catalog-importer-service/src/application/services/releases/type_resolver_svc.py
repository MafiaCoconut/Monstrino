
from monstrino_models.dto import ParsedRelease


class TypeResolverService:
    async def resolve(self, uow, parsed: ParsedRelease) -> None:
        type_ids: list[int] = []

        for type_name in parsed.types or []:
            t_id = await uow.repos.release_types.get_id_by_name(type_name)
            if t_id:
                type_ids.append(t_id)

        if parsed.pack_type:
            pack_type_id = await uow.repos.release_types.get_id_by_name(parsed.pack_type)
            if pack_type_id:
                type_ids.append(pack_type_id)

        parsed.type_ids = type_ids
