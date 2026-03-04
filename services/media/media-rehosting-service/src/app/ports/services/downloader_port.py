from typing import Protocol

from monstrino_core.domain.value_objects import DownloadedFile


class DownloaderPort(Protocol):
    async def download(self, url: str, *, max_bytes: int = 0) -> DownloadedFile:
        ...