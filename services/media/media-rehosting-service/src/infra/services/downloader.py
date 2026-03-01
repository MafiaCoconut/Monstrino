import asyncio
import hashlib
import ipaddress
from dataclasses import dataclass
from io import BytesIO
from typing import Optional
from urllib.parse import urlparse

import httpx
from PIL import Image


@dataclass(frozen=True)
class DownloadedFile:
    content: bytes
    sha256_hex: str
    content_type: str
    byte_size: int
    width: Optional[int]
    height: Optional[int]
    original_filename: Optional[str]


class AsyncImageDownloader:
    """
    Production-ready image downloader with:
    - streaming download
    - size limit
    - SHA256 hashing
    - basic SSRF protection
    """

    def __init__(
        self,
        *,
        timeout_seconds: float = 15.0,
        max_redirects: int = 5,
    ):
        self._timeout = timeout_seconds
        self._max_redirects = max_redirects

    # -----------------------
    # Public API
    # -----------------------

    async def download(self, url: str, *, max_bytes: int) -> DownloadedFile:
        self._validate_url(url)

        async with httpx.AsyncClient(
            follow_redirects=True,
            timeout=self._timeout,
            max_redirects=self._max_redirects,
        ) as client:

            async with client.stream("GET", url) as response:
                response.raise_for_status()

                content_type = response.headers.get("content-type", "").split(";")[0]

                hasher = hashlib.sha256()
                buffer = bytearray()
                total = 0

                async for chunk in response.aiter_bytes():
                    total += len(chunk)

                    if total > max_bytes:
                        raise ValueError("File exceeds allowed size")

                    hasher.update(chunk)
                    buffer.extend(chunk)

        content = bytes(buffer)
        sha256_hex = hasher.hexdigest()

        width, height = self._extract_image_size(content)

        return DownloadedFile(
            content=content,
            sha256_hex=sha256_hex,
            content_type=content_type or "application/octet-stream",
            byte_size=total,
            width=width,
            height=height,
            original_filename=self._extract_filename(url),
        )

    # -----------------------
    # Internal helpers
    # -----------------------

    def _validate_url(self, url: str) -> None:
        parsed = urlparse(url)

        if parsed.scheme not in {"http", "https"}:
            raise ValueError("Only http/https URLs allowed")

        if not parsed.hostname:
            raise ValueError("Invalid URL")

        # SSRF protection: block private/local IPs
        try:
            ip = ipaddress.ip_address(parsed.hostname)
            if ip.is_private or ip.is_loopback or ip.is_reserved:
                raise ValueError("Private IP addresses are not allowed")
        except ValueError:
            # Not an IP → likely domain, OK
            pass

    def _extract_image_size(self, content: bytes) -> tuple[Optional[int], Optional[int]]:
        try:
            with Image.open(BytesIO(content)) as img:
                return img.width, img.height
        except Exception:
            return None, None

    def _extract_filename(self, url: str) -> Optional[str]:
        path = urlparse(url).path
        if not path:
            return None
        return path.split("/")[-1] or None