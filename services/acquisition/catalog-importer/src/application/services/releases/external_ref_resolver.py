from typing import Any
import logging
from uuid import UUID

from icecream import ic
from monstrino_core.domain.errors import ExclusiveDataInvalidError, SourceNotFoundError
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleaseExclusiveLink, ReleaseExternalReference, Source

from application.ports import Repositories

logger = logging.getLogger(__name__)


class ExternalRefResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            source_id: UUID,
            external_id: str
    ):
        external_ref = ReleaseExternalReference(
            release_id=release_id,
            source_id=source_id,
            external_id=external_id
        )
        ic(external_ref)
        await uow.repos.release_external_reference.save(external_ref)
