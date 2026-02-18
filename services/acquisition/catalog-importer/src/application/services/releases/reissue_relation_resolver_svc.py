from typing import Any
import logging

from uuid import UUID
from icecream import ic
from monstrino_core.domain.errors import ReleaseRelationTypeNotFoundError, RelatedReleaseNotFoundError
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.domain.value_objects.release import ReleaseRelationType
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleaseRelationLink, RelationType, Release

from application.ports import Repositories

logger = logging.getLogger(__name__)


class ReissueRelationResolverService:
    """
    Iterate each reissue title
    Find release with that title
    If found, create release relation of type "reissue"

    """

    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            reissue_list: list[str]

    ) -> None:
        if not reissue_list:
            return

        relation_type_id = await uow.repos.relation_type.get_id_by(**{RelationType.CODE: ReleaseRelationType.REISSUE})
        if not relation_type_id:
            raise ReleaseRelationTypeNotFoundError(
                f"Relation type '{ReleaseRelationType.REISSUE}' not found in the database."
            )

        for reissue_release_title in reissue_list:
            rel_release = await uow.repos.release.get_one_by(**{Release.CODE: TitleFormatter.to_code(reissue_release_title)})
            ic(rel_release)
            if rel_release:
                release_relation_link = ReleaseRelationLink(
                    release_id=release_id,
                    related_release_id=rel_release.id,
                    relation_type_id=relation_type_id
                )
                await uow.repos.release_relation_link.save(release_relation_link)
            else:
                raise RelatedReleaseNotFoundError(
                    f"Related release '{reissue_release_title}' not found in the database."
                )
