from typing import Any
import logging
from uuid import UUID
from datetime import datetime
from icecream import ic
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_core.shared.enums import StorageProviders, MediaVisibility, MediaKind, MediaProcessingStates
from monstrino_core.shared.enums.media.media_source_type import MediaSourceType
from monstrino_infra.debug import ic_model
from monstrino_models.dto import MediaIngestionJob, MediaAsset, MediaAttachment

from app.ports import Repositories, DownloaderPort
from app.ports.services.s3_port import S3Port


logger = logging.getLogger(__name__)


class IngestExternalMediaUseCase:
    def __init__(
        self,
        uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],

        downloader: DownloaderPort,
        s3_storage: S3Port,

    ):
        self.uow_factory = uow_factory

        self.downloader = downloader
        self.s3_storage = s3_storage

        self.storage_key_template = "assets/image/sha256/{first_index}/{second_index}/{filename}.{ext}"
        self.bucket_name = "test"

    async def execute(self):
        """
        lease → download → store → asset → attachment → job complete → emit event
        """
        logger.info(f"Starting external media ingestion use case")
        start_time = datetime.now()
        async with self.uow_factory.create() as uow:
            rehost_job = await uow.repos.media_ingestion_job.claim_unprocessed_rehost_job()
            if not rehost_job:
                logger.warning(f"No unprocessed rehost job found.")
                return
            # ic_model(rehost_job)


        try:
            async with self.uow_factory.create() as uow:

                downloaded = await self.downloader.download(rehost_job.source_url)

                exist_ingestion_job = await uow.repos.media_ingestion_job.get_id_by(**{MediaIngestionJob.CONTENT_HASH_SHA256: downloaded.sha256_hex})

                if exist_ingestion_job:
                    logger.info(f"Found existing asset: {exist_ingestion_job}")
                    # TODO: link existing asset to the job, mark job as completed, emit event
                    return

                exist_asset = await uow.repos.media_asset.get_id_by(**{MediaAsset.CONTENT_HASH_SHA256: downloaded.sha256_hex})

                if exist_asset:
                    logger.info(f"Found existing asset: {exist_asset}. Skipping")
                    await self.set_job_as_processed(uow, rehost_job.id)
                    return

                storage_key = self.storage_key_template.format(
                    first_index=downloaded.sha256_hex[0:2],
                    second_index=downloaded.sha256_hex[2:4],
                    filename=downloaded.sha256_hex,
                    ext=downloaded.ext
                )
                public_url = await self.s3_storage.put(
                    bucket=self.bucket_name,
                    key=storage_key,
                    content=downloaded.content,
                    content_type=downloaded.content_type,
                )
                ic(public_url)

                media_asset = MediaAsset(
                    provider=StorageProviders.MINIO,
                    bucket=self.bucket_name,
                    storage_key=storage_key,

                    visibility=MediaVisibility.PRIVATE,
                    source_type=MediaSourceType.EXTERNAL,

                    media_kind=MediaKind.IMAGE,

                    content_hash_sha256=downloaded.sha256_hex,
                    content_type=downloaded.content_type,
                    byte_size=downloaded.byte_size,
                    width=downloaded.width,
                    height=downloaded.height,

                    original_filename=downloaded.original_filename,

                    source_url=rehost_job.source_url,

                    ingestion_trace={
                        "job_id": str(rehost_job.id)
                    }
                )
                ic_model(media_asset)
                asset = await uow.repos.media_asset.save(media_asset)

                media_attachment = MediaAttachment(
                    asset_id=asset.id,

                    owner_service=rehost_job.owner_service,
                    owner_type=rehost_job.owner_type,
                    owner_id=rehost_job.owner_id,
                    owner_ref=rehost_job.owner_ref,

                    role=rehost_job.role,
                    sort_order=rehost_job.sort_order,

                    display_filename=rehost_job.requested_filename
                )
                attachment = await uow.repos.media_attachment.save(media_attachment)

                logger.info(
                    f"Successfully ingested media from {rehost_job.source_url} as asset {asset.id} and "
                    f"attachment {attachment.id} in {(datetime.now() - start_time).total_seconds()} seconds"
                )

                await self.set_job_as_processed(uow, rehost_job.id)
        except Exception as e:
            logger.error(f"Error uploading media from {rehost_job.source_url}: {e}")
            async with self.uow_factory.create() as uow:
                await self.set_job_as_with_errors(uow, rehost_job.id)

    async def set_job_as_processed(self, uow: UnitOfWorkInterface[Any, Repositories], job_id: UUID):
        await uow.repos.media_ingestion_job.update({MediaIngestionJob.ID: job_id}, {MediaIngestionJob.STATE: MediaProcessingStates.PROCESSED})


    async def set_job_as_with_errors(self, uow: UnitOfWorkInterface[Any, Repositories], job_id: UUID):
        await uow.repos.media_ingestion_job.update({MediaIngestionJob.ID: job_id}, {MediaIngestionJob.STATE: MediaProcessingStates.PROCESSED})

