import asyncio
import hashlib
import ipaddress
import os
from dataclasses import dataclass
from io import BytesIO
from typing import Optional
from urllib.parse import urlparse

import httpx
from PIL import Image
from monstrino_core.domain.value_objects import DownloadedFile

global_headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-User": "?1",
    "Sec-Fetch-Dest": "document",
    "Priority": "u=0, i",
}

cookies = {
    "cf_clearance": os.getenv("MHARCHIVE_COOKIE"),
}

class AsyncImageDownloader:
    def __init__(self, *, timeout_seconds: float = 15.0, max_redirects: int = 5):
        self._timeout = timeout_seconds
        self._max_redirects = max_redirects

    async def download(self, url: str, *, max_bytes: int = 15728640) -> DownloadedFile:
        self._validate_url(url)

        async with httpx.AsyncClient(
            follow_redirects=True,
            timeout=self._timeout,
            max_redirects=self._max_redirects,
            headers=global_headers,
            cookies=cookies,

        ) as client:
            async with client.stream("GET", url) as response:
                response.raise_for_status()

                header_ct = response.headers.get("content-type", "").split(";")[0].strip()

                hasher = hashlib.sha256()
                buf = bytearray()
                total = 0

                async for chunk in response.aiter_bytes():
                    total += len(chunk)
                    if total > max_bytes:
                        raise ValueError("File exceeds allowed size")

                    hasher.update(chunk)
                    buf.extend(chunk)

        content = bytes(buf)
        sha256_hex = hasher.hexdigest()

        width, height, img_format, ext = self._inspect_image(content)

        # Prefer real content-type derived from format when possible,
        # otherwise fall back to header.
        content_type = self._content_type_from_format(img_format) or header_ct or "application/octet-stream"

        return DownloadedFile(
            content=content,
            sha256_hex=sha256_hex,
            content_type=content_type,
            byte_size=total,
            width=width,
            height=height,
            original_filename=self._extract_filename(url),
            ext=ext,
            image_format=img_format,
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

        # SSRF basic: block direct private/loopback IPs
        try:
            ip = ipaddress.ip_address(parsed.hostname)
            if ip.is_private or ip.is_loopback or ip.is_reserved or ip.is_link_local:
                raise ValueError("Private/link-local IP addresses are not allowed")
        except ValueError:
            # Not an IP -> domain; OK here (for stricter security add DNS resolve + re-check)
            pass

    def _inspect_image(self, content: bytes) -> tuple[Optional[int], Optional[int], Optional[str], Optional[str]]:
        """
        Returns: width, height, PIL format (e.g. 'JPEG'), ext (e.g. 'jpg')
        """
        try:
            with Image.open(BytesIO(content)) as img:
                fmt = (img.format or "").upper() or None
                w, h = img.width, img.height
                ext = self._ext_from_pil_format(fmt)
                return w, h, fmt, ext
        except Exception:
            return None, None, None, None

    @staticmethod
    def _ext_from_pil_format(fmt: Optional[str]) -> Optional[str]:
        if not fmt:
            return None
        mapping = {
            "JPEG": "jpg",
            "JPG": "jpg",
            "PNG": "png",
            "WEBP": "webp",
            "GIF": "gif",
            "BMP": "bmp",
            "TIFF": "tif",
            "AVIF": "avif",  # if Pillow build supports it
        }
        return mapping.get(fmt)

    @staticmethod
    def _content_type_from_format(fmt: Optional[str]) -> Optional[str]:
        if not fmt:
            return None
        mapping = {
            "JPEG": "image/jpeg",
            "PNG": "image/png",
            "WEBP": "image/webp",
            "GIF": "image/gif",
            "BMP": "image/bmp",
            "TIFF": "image/tiff",
            "AVIF": "image/avif",
        }
        return mapping.get(fmt)

    @staticmethod
    def _extract_filename(url: str) -> Optional[str]:
        path = urlparse(url).path
        if not path:
            return None
        name = path.split("/")[-1]
        return name or None

    # -----------------------
    # Internal helpers
    # -----------------------
