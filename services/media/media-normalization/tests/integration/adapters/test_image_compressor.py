import pytest
from icecream import ic

from infra.adapters import ImageCompressorPort


@pytest.mark.asyncio
async def test_image_compressor():
    image_compressor = ImageCompressorPort()

    with open("tests/data/test-image-1.jpg", "rb") as f:
        original_data = f.read()
    print(await image_compressor.get_file_size(original_data))

    compressed_data = await image_compressor.compress(
        image_data=original_data,
        quality=100,
        optimize=True,
        target_size_kb=100
    )
    ic(await image_compressor.get_file_size(compressed_data))

    with open("tests/data/test-image-1-compressed.jpg", "wb") as f:
        f.write(compressed_data)