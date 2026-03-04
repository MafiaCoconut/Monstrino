from __future__ import annotations

import os
from dataclasses import dataclass
from datetime import timedelta
from io import BytesIO
from typing import Optional

from minio import Minio
from minio.error import S3Error


class StorageError(RuntimeError):
    pass


# @dataclass(frozen=True)
# class MinioConfig:
#     endpoint: str
#     access_key: str
#     secret_key: str
#     secure: bool = False
#     region: Optional[str] = None
#
#     # If you expose MinIO via gateway/proxy and want deterministic public URL:
#     public_base_url: Optional[str] = None  # e.g. "https://media.monstrino.local"


class MinioStorage:
    """
    MinIO storage adapter.

    Responsibilities:
    - ensure bucket exists (optional)
    - upload object with content-type
    - return either a deterministic public URL (if public_base_url provided)
      or a presigned GET URL.
    """

    def __init__(self):
        self._client = self.__get_cfg()
        self.public_base_url = "https://media.monstrino.com"

    def __get_cfg(self) -> Minio:
        mode = os.getenv("MODE", None)
        if not mode:
            raise ValueError(f"MODE environment variable is not set")

        match mode:
            case "development":
                return Minio(
                    endpoint=os.getenv("MINIO_ENDPOINT"),
                    access_key=os.getenv("MINIO_ACCESS_KEY"),
                    secret_key=os.getenv("MINIO_SECRET_KEY"),
                    secure=False,

                )
            case "production":
                raise ValueError(f"Production mode is not implemented yet")

    def ensure_bucket(self, bucket: str) -> None:
        try:
            if not self._client.bucket_exists(bucket):
                self._client.make_bucket(bucket)
        except S3Error as e:
            raise StorageError(f"MinIO bucket ensure failed: {e}") from e

    async def put(
        self,
        *,
        bucket: str,
        key: str,
        content: bytes,
        content_type: str,
        make_bucket_if_missing: bool = True,
        return_presigned_url: bool = False,
        presigned_ttl: timedelta = timedelta(hours=24),
    ) -> Optional[str]:
        """
        Upload object to MinIO.

        Returns:
            Optional[str]: public URL (if configured) or presigned URL if requested.
        """
        if make_bucket_if_missing:
            self.ensure_bucket(bucket)

        data = BytesIO(content)
        length = len(content)

        try:
            self._client.put_object(
                bucket_name=bucket,
                object_name=key,
                data=data,
                length=length,
                content_type=content_type,
            )
        except S3Error as e:
            raise StorageError(f"MinIO put_object failed: {e}") from e

        # URL strategy:
        # 1) If you have a public gateway URL -> deterministic URL.
        if self.public_base_url and not return_presigned_url:
            base = self.public_base_url.rstrip("/")
            # Common public layout: <base>/<bucket>/<key>
            return f"{base}/{bucket}/{key}"

        # 2) Otherwise -> presigned URL (works even if bucket is private).
        if return_presigned_url:
            try:
                return self._client.presigned_get_object(
                    bucket_name=bucket,
                    object_name=key,
                    expires=presigned_ttl,  # timedelta, НЕ int
                )
            except S3Error as e:
                raise StorageError(f"MinIO presigned_get_object failed: {e}") from e

        return None