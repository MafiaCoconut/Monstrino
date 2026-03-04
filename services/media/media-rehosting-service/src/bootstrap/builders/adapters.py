from bootstrap.container_components.adapters import Adapters
from infra.services.downloader import AsyncImageDownloader
from infra.services.minio_storage import MinioStorage


def build_adapters() -> Adapters:
    return Adapters(
        minio_storage=MinioStorage(),
        image_downloader=AsyncImageDownloader(),
    )