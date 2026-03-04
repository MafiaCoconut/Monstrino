from uuid import UUID

import pytest

from app.use_cases.process_new_image_uc import ProcessNewImageUseCase
from infra.adapters import ImageFormatConverter
from infra.adapters.image_compressor import ImageCompressor


def get_uc(uow_factory):
    return ProcessNewImageUseCase(
        uow_factory=uow_factory,
        image_compressor=ImageCompressor(),
        image_format_converter=ImageFormatConverter(),
    )

@pytest.mark.asyncio
async def test_process_single_phot(uow_factory):
    uc = get_uc(uow_factory)

    await uc.execute(UUID("019cabcf-dca2-701a-be29-af6a6d09d379"))

