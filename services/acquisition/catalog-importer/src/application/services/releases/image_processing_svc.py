from typing import Any
import logging

from icecream import ic
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleaseRelationLink, ReleaseImage
from monstrino_models.enums import EntityName

from app.container_components import Repositories

from monstrino_models.dto import ParsedRelease, Release

from application.services.common import ImageReferenceService

logger = logging.getLogger(__name__)


class ImageProcessingService:
    async def process_images(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            image_reference_svc: ImageReferenceService,
            release_id: int,
            primary_image: str,
            other_images_list: list[str],


    ) -> None:

        if primary_image:
            release_primary_image = await uow.repos.release_image.save(
                ReleaseImage(
                    release_id=release_id,
                    image_url=primary_image,
                    is_primary=True
                )
            )
            ic(release_primary_image)
            await image_reference_svc.set_image_to_process(
                uow=uow,
                table=EntityName.RELEASE_IMAGE,
                field=ReleaseImage.IMAGE_URL,
                image_link=primary_image,
                record_id=release_primary_image.id,
            )
        else:
            logger.warning("No primary image for release ID %s", release_id)


        for url in other_images_list:
            release_image = await uow.repos.release_image.save(
                ReleaseImage(
                    release_id=release_id,
                    image_url=url,
                    is_primary=False
                )
            )
            ic(release_image)
            await image_reference_svc.set_image_to_process(
                uow=uow,
                table=EntityName.RELEASE_IMAGE,
                field=ReleaseImage.IMAGE_URL,
                image_link=url,
                record_id=release_image.id,
            )


