
from monstrino_models.dto import ParsedRelease


class ExclusiveResolverService:
    async def resolve(self, uow, parsed: ParsedRelease) -> None:
        if not parsed.exclusives:
            parsed.exclusive_ids = []
            return

        exclusive_ids: list[int] = []
        for name in parsed.exclusives:
            ex_id = await uow.repos.release_exclusives.get_id_by_name(name)
            if ex_id:
                exclusive_ids.append(ex_id)

        parsed.exclusive_ids = exclusive_ids

        exclusive_type_id = await uow.repos.release_types.get_id_by_name("exclusive")
        if exclusive_type_id:
            parsed.type_ids = (parsed.type_ids or []) + [exclusive_type_id]
