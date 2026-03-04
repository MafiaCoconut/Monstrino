from dataclasses import dataclass

from app.ports import DownloaderPort
from app.ports.services.s3_port import S3Port


@dataclass(frozen=True)
class Adapters:
    minio_storage: S3Port
    image_downloader: DownloaderPort

