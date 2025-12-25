from typing import Any
import logging

from icecream import ic
from monstrino_core.domain.errors import ReleaseRelationTypeNotFoundError, RelatedReleaseNotFoundError
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.value_objects.release import ReleaseRelationType
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleaseRelationLink

from app.container_components import Repositories

logger = logging.getLogger(__name__)


class ReissueRelationResolverService:
    """
    Iterate each reissue name
    Find release with that name
    If found, create release relation of type "reissue"

    """
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            reissue_list: list[str]

    ) -> None:
        relation_type_id = await uow.repos.relation_type.get_id_by(name=ReleaseRelationType.REISSUE)
        if not relation_type_id:
            raise ReleaseRelationTypeNotFoundError(
                f"Relation type '{ReleaseRelationType.REISSUE}' not found in the database."
            )

        for reissue_release_name in reissue_list:
            rel_release = await uow.repos.release.get_one_by(name=NameFormatter.format_name(reissue_release_name))
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
                    f"Related release '{reissue_release_name}' not found in the database."
                )
