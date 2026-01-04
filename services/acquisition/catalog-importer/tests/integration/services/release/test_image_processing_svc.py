import pytest
import logging
from unittest.mock import AsyncMock

from monstrino_models.dto import ReleaseImage
from monstrino_models.enums import EntityName
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.services.common import ImageReferenceService
from application.services.releases import ImageProcessingService
from bootstrap.container_components import Repositories


PRIMARY = "https://example.com/primary.png"
IMG_1 = "https://example.com/img1.png"
IMG_2 = "https://example.com/img2.png"


@pytest.mark.asyncio
async def test_image_processing_service_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list
):
    """
    Test that primary image and secondary images are saved
    and passed to image_resolver_svc with correct parameters.
    """

    service = ImageProcessingService()
    image_resolver_svc = AsyncMock(spec=ImageReferenceService)

    async with uow_factory.create() as uow:
        await service.process_images(
            uow=uow,
            image_reference_svc=image_resolver_svc,
            release_id=1,
            primary_image=PRIMARY,
            other_images_list=[IMG_1, IMG_2],
        )

    # Validate DB content
    async with uow_factory.create() as uow:
        images: list[ReleaseImage] = await uow.repos.release_image.get_all()

        # 1 primary + 2 secondary
        assert len(images) == 3

        primary = next(img for img in images if img.is_primary is True)
        assert primary.image_url == PRIMARY

        secondaries = [img for img in images if img.is_primary is False]
        assert {img.image_url for img in secondaries} == {IMG_1, IMG_2}

    # Validate calls to resolver
    assert image_resolver_svc.set_image_to_process.await_count == 3

    # First call must use primary
    first_call = image_resolver_svc.set_image_to_process.await_args_list[0].kwargs
    assert first_call["image_link"] == PRIMARY
    assert first_call["table"] == EntityName.RELEASE_IMAGE

    # Next calls must use secondary URLs
    second_call = image_resolver_svc.set_image_to_process.await_args_list[1].kwargs
    third_call = image_resolver_svc.set_image_to_process.await_args_list[2].kwargs

    assert second_call["image_link"] == IMG_1
    assert third_call["image_link"] == IMG_2


@pytest.mark.asyncio
async def test_image_processing_service_no_primary(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list,
        caplog
):
    """
    Test: if primary_image is empty -> warning is logged,
    but secondary images are still processed normally.
    """

    service = ImageProcessingService()
    image_resolver_svc = AsyncMock(spec=ImageReferenceService)

    with caplog.at_level(logging.WARNING):
        async with uow_factory.create() as uow:
            await service.process_images(
                uow=uow,
                image_reference_svc=image_resolver_svc,
                release_id=1,
                primary_image="",
                other_images_list=[IMG_1, IMG_2],
            )

    # Warning emitted
    assert "No primary image for release ID 1" in caplog.text

    # Validate DB content
    async with uow_factory.create() as uow:
        images = await uow.repos.release_image.get_all()

        # Only secondary images
        assert len(images) == 2
        assert all(img.is_primary is False for img in images)

    # Calls to resolver only for secondary images
    assert image_resolver_svc.set_image_to_process.await_count == 2

    urls = {
        image_resolver_svc.set_image_to_process.await_args_list[0].kwargs["image_link"],
        image_resolver_svc.set_image_to_process.await_args_list[1].kwargs["image_link"],
    }
    assert urls == {IMG_1, IMG_2}


@pytest.mark.asyncio
async def test_image_processing_service_empty_other_images(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list
):
    """
    Test: primary is saved, secondary list is empty.
    """
    service = ImageProcessingService()
    image_resolver_svc = AsyncMock(spec=ImageReferenceService)

    async with uow_factory.create() as uow:
        await service.process_images(
            uow=uow,
            image_reference_svc=image_resolver_svc,
            release_id=1,
            primary_image=PRIMARY,
            other_images_list=[],
        )

    async with uow_factory.create() as uow:
        images = await uow.repos.release_image.get_all()

        # Only primary
        assert len(images) == 1
        assert images[0].is_primary is True
        assert images[0].image_url == PRIMARY

    # Resolver called once
    assert image_resolver_svc.set_image_to_process.await_count == 1

    first_call = image_resolver_svc.set_image_to_process.await_args_list[0].kwargs
    assert first_call["image_link"] == PRIMARY

@pytest.mark.asyncio
async def test_image_processing_service_with_image_reference_end_to_end(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list,
        seed_image_reference_origin_list,   # 👈 важно! сид таблицы origin
):
    """
    End-to-end test:
    - release_image entries created
    - image_reference_svc writes correct records into image_import_queue
    """

    service = ImageProcessingService()
    image_reference_svc = ImageReferenceService()   # <--- НЕ mock, реальный сервис

    async with uow_factory.create() as uow:
        await service.process_images(
            uow=uow,
            image_reference_svc=image_reference_svc,
            release_id=1,
            primary_image=PRIMARY,
            other_images_list=[IMG_1, IMG_2],
        )

    # -------------------- VALIDATION --------------------

    async with uow_factory.create() as uow:

        # 1) Проверяем release_image
        images: list[ReleaseImage] = await uow.repos.release_image.get_all()
        assert len(images) == 3

        prim = next(img for img in images if img.is_primary)
        sec_urls = {img.image_url for img in images if not img.is_primary}
        assert prim.image_url == PRIMARY
        assert sec_urls == {IMG_1, IMG_2}

        # 2) Проверяем image_import_queue
        imports = await uow.repos.image_import_queue.get_all()
        assert len(imports) == 3

        # Получаем реальный ref_id из сидов
        ref_id = await uow.repos.image_reference_origin.get_id_by_table_and_field(
            EntityName.RELEASE_IMAGE,
            ReleaseImage.IMAGE_URL,
        )
        assert ref_id is not None

        # Проверяем, что origin_reference_id корректный
        assert all(row.origin_reference_id == ref_id for row in imports)

        # Проверяем, что original_link совпадает
        links = {row.original_link for row in imports}
        assert links == {PRIMARY, IMG_1, IMG_2}

        # Проверяем связь import_record_id -> release_image.id
        image_ids = {img.id for img in images}
        for imp in imports:
            assert imp.origin_record_id in image_ids
