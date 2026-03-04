"""Image processing utilities."""

import base64
import io
from typing import Literal, Optional

import numpy as np
from PIL import Image

from app.config import settings
from app.core.exceptions import ImageProcessingError
from app.core.logging import get_logger

logger = get_logger(__name__)


def load_image_from_bytes(image_bytes: bytes) -> np.ndarray:
    """Load image from bytes.

    Args:
        image_bytes: Image data as bytes

    Returns:
        Image as RGB numpy array (H, W, 3)

    Raises:
        ImageProcessingError: If image loading fails
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))

        # Convert to RGB
        if image.mode != "RGB":
            image = image.convert("RGB")

        # Resize if too large
        max_size = settings.max_image_size
        if max(image.size) > max_size:
            ratio = max_size / max(image.size)
            new_size = (int(image.size[0] * ratio), int(image.size[1] * ratio))
            image = image.resize(new_size, Image.Resampling.LANCZOS)
            logger.info("image_resized", original_size=image.size,
                        new_size=new_size)

        return np.array(image)

    except Exception as e:
        logger.error("image_load_failed", error=str(e))
        raise ImageProcessingError(f"Failed to load image: {e}") from e


def apply_mask_to_image(
    image: np.ndarray,
    mask: np.ndarray,
    crop: bool = True,
    padding: int = 10,
) -> np.ndarray:
    """Apply mask to image to create transparent background.

    Args:
        image: Input RGB image (H, W, 3)
        mask: Binary mask (H, W) with values 0 or 255
        crop: Whether to crop to mask bounding box
        padding: Padding pixels around crop (if crop=True)

    Returns:
        RGBA image with transparent background (H, W, 4)
    """
    # Create RGBA image
    rgba_image = np.zeros((image.shape[0], image.shape[1], 4), dtype=np.uint8)
    rgba_image[:, :, :3] = image
    rgba_image[:, :, 3] = mask

    if crop:
        # Find bounding box of mask
        rows = np.any(mask > 0, axis=1)
        cols = np.any(mask > 0, axis=0)

        if not rows.any() or not cols.any():
            # Empty mask, return full image
            return rgba_image

        ymin, ymax = np.where(rows)[0][[0, -1]]
        xmin, xmax = np.where(cols)[0][[0, -1]]

        # Add padding
        h, w = image.shape[:2]
        ymin = max(0, ymin - padding)
        ymax = min(h, ymax + padding + 1)
        xmin = max(0, xmin - padding)
        xmax = min(w, xmax + padding + 1)

        # Crop
        rgba_image = rgba_image[ymin:ymax, xmin:xmax]

    return rgba_image


def encode_image_to_bytes(
    image: np.ndarray,
    format: Literal["png", "webp"] = "png",
    quality: int = 95,
) -> bytes:
    """Encode image to bytes.

    Args:
        image: RGBA numpy array (H, W, 4)
        format: Output format (png or webp)
        quality: Quality for WebP (1-100, ignored for PNG)

    Returns:
        Image bytes

    Raises:
        ImageProcessingError: If encoding fails
    """
    try:
        pil_image = Image.fromarray(image, mode="RGBA")

        buffer = io.BytesIO()

        if format == "png":
            pil_image.save(buffer, format="PNG", optimize=True)
        elif format == "webp":
            pil_image.save(buffer, format="WEBP", quality=quality, method=6)
        else:
            raise ValueError(f"Unsupported format: {format}")

        return buffer.getvalue()

    except Exception as e:
        logger.error("image_encode_failed", format=format, error=str(e))
        raise ImageProcessingError(f"Failed to encode image: {e}") from e


def encode_image_to_base64(
    image: np.ndarray,
    format: Literal["png", "webp"] = "png",
    quality: int = 95,
) -> str:
    """Encode image to base64 string.

    Args:
        image: RGBA numpy array (H, W, 4)
        format: Output format (png or webp)
        quality: Quality for WebP

    Returns:
        Base64-encoded image string
    """
    image_bytes = encode_image_to_bytes(image, format, quality)
    return base64.b64encode(image_bytes).decode("utf-8")


def calculate_bbox_from_mask(mask: np.ndarray) -> tuple[int, int, int, int]:
    """Calculate bounding box from mask.

    Args:
        mask: Binary mask (H, W)

    Returns:
        Bounding box as (x1, y1, x2, y2)
    """
    rows = np.any(mask > 0, axis=1)
    cols = np.any(mask > 0, axis=0)

    if not rows.any() or not cols.any():
        return (0, 0, 0, 0)

    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]

    return (int(xmin), int(ymin), int(xmax), int(ymax))
