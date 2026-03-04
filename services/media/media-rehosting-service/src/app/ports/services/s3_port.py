from datetime import timedelta
from typing import Optional, Protocol

from monstrino_core.domain.value_objects import DownloadedFile


class S3Port(Protocol):
    def ensure_bucket(self, bucket: str) -> None:
        """Ensures that the specified bucket exists, creating it if necessary."""
        ...

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
        ...