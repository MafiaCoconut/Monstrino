from typing import Any
from uuid import UUID

import pytest
from monstrino_core.domain.services.media import IdempotencyKeyFactory, IdempotencyKeyPayload
from monstrino_core.domain.value_objects import Sources
from monstrino_core.domain.value_objects.media.ingestion import IngestionJobType, IngestionJobState
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_core.shared.enums import MediaOwnerType
from monstrino_core.shared.enums.platform import Microservices
from monstrino_models.dto import MediaIngestionJob, Source, SourceCountry

from app.ports import Repositories
from app.use_cases.ingest_external_media_use_case import IngestExternalMediaUseCase
from bootstrap.builders.adapters import build_adapters


def ingestion_job():
    payload = IdempotencyKeyPayload(
        job_type=IngestionJobType.EXTERNAL_INGEST,
        owner_service="catalog-collector",
        owner_type=MediaOwnerType.RELEASE,
        owner_id=UUID("00000000-0000-0000-0000-000000000001"),
        role="primary",
        sort_order=0,
        source_url="https://mhcollector.com/wp-content/uploads/2026/02/Skullector-Beetlejuice-Afterlife-Waiting-Room-11.jpg",
    )

    return MediaIngestionJob(
        job_type=payload.job_type,
        idempotency_key=IdempotencyKeyFactory.create(
            payload=payload
        ),
        owner_service=payload.owner_service,
        owner_type=payload.owner_type,
        owner_id=payload.owner_id,
        owner_ref=IdempotencyKeyFactory.create_ref(payload),

        role=payload.role,
        sort_order=payload.sort_order,

        state=IngestionJobState.INIT,
    )

async def save_ingestion_job(uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]):
    async with uow_factory.create() as uow:
        item = ingestion_job()
        item.source_country_id = await uow.repos.source_country.get_id_by(**{SourceCountry.SOURCE_CODE: Sources.MH_ARCHIVE})

        await uow.repos.media_ingestion_job.save(item)

async def get_uc(uow_factory: UnitOfWorkFactoryInterface[Any, Repositories]) -> IngestExternalMediaUseCase:
    # await save_ingestion_job(uow_factory)
    adapters = build_adapters()

    return IngestExternalMediaUseCase(
        uow_factory=uow_factory,

        downloader=adapters.image_downloader,
        s3_storage=adapters.minio_storage
    )

@pytest.mark.asyncio
async def test_parse_mh_archive_us(
        uow_factory_without_reset_db: UnitOfWorkFactoryInterface[Any, Repositories],
):

    uc = await get_uc(uow_factory_without_reset_db)
    await uc.execute()