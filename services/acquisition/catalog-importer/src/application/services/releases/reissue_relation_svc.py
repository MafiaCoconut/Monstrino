
from monstrino_core.domain.services import NameFormatter
from monstrino_models.dto import ParsedRelease


class ReissueRelationService:
    async def resolve(self, uow, parsed: ParsedRelease) -> None:
        if not parsed.reissue_of:
            return

        relation_type_id = await uow.repos.release_relation_types.get_id_by_name("reissue")
        parent_id = await uow.repos.releases.get_id_by_name(
            NameFormatter.format_name(parsed.reissue_of)
        )

        if parent_id and relation_type_id:
            await uow.repos.release_relations.save_relation(
                release_id=parsed.id,
                related_release_id=parent_id,
                relation_type_id=relation_type_id,
            )
