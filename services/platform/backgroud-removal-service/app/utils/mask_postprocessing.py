"""Mask postprocessing utilities."""

import cv2
import numpy as np
from scipy import ndimage

from app.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)


def remove_small_components(
    mask: np.ndarray,
    min_area: int | None = None,
) -> np.ndarray:
    """Remove small connected components from mask.

    Args:
        mask: Binary mask (H, W) with values 0 or 255
        min_area: Minimum area in pixels (default: settings.min_mask_area)

    Returns:
        Cleaned mask
    """
    if min_area is None:
        min_area = settings.min_mask_area

    if min_area <= 0:
        return mask

    # Find connected components
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(
        mask, connectivity=8
    )

    # Create output mask
    output_mask = np.zeros_like(mask)

    # Keep components larger than min_area (skip label 0 = background)
    for label in range(1, num_labels):
        area = stats[label, cv2.CC_STAT_AREA]
        if area >= min_area:
            output_mask[labels == label] = 255

    removed = num_labels - 1 - np.sum(output_mask > 0)
    if removed > 0:
        logger.debug("small_components_removed",
                     count=removed, min_area=min_area)

    return output_mask


def fill_holes(mask: np.ndarray) -> np.ndarray:
    """Fill holes in mask using morphological operations.

    Args:
        mask: Binary mask (H, W) with values 0 or 255

    Returns:
        Mask with holes filled
    """
    if not settings.fill_holes:
        return mask

    # Use scipy's binary_fill_holes
    mask_bool = mask > 0
    filled = ndimage.binary_fill_holes(mask_bool)

    return (filled.astype(np.uint8) * 255)


def feather_edges(
    mask: np.ndarray,
    radius: int | None = None,
) -> np.ndarray:
    """Apply feathering (soft edges) to mask.

    Args:
        mask: Binary mask (H, W) with values 0 or 255
        radius: Feathering radius in pixels (default: settings.feather_radius)

    Returns:
        Mask with feathered edges
    """
    if radius is None:
        radius = settings.feather_radius

    if radius <= 0:
        return mask

    # Apply Gaussian blur for soft edges
    kernel_size = radius * 2 + 1
    blurred = cv2.GaussianBlur(mask, (kernel_size, kernel_size), radius / 2)

    logger.debug("mask_feathered", radius=radius)
    return blurred


def smooth_mask_edges(
    mask: np.ndarray,
    kernel_size: int = 5,
) -> np.ndarray:
    """Smooth mask edges using morphological operations.

    Args:
        mask: Binary mask (H, W) with values 0 or 255
        kernel_size: Size of morphological kernel

    Returns:
        Mask with smoothed edges
    """
    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE, (kernel_size, kernel_size))

    # Close (dilation + erosion) to smooth edges
    smoothed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    # Open (erosion + dilation) to remove small protrusions
    smoothed = cv2.morphologyEx(smoothed, cv2.MORPH_OPEN, kernel)

    return smoothed


def postprocess_mask(
    mask: np.ndarray,
    remove_small: bool = True,
    fill: bool = True,
    feather: bool = True,
    smooth: bool = True,
) -> np.ndarray:
    """Full mask postprocessing pipeline.

    Args:
        mask: Binary mask (H, W) with values 0 or 255
        remove_small: Remove small components
        fill: Fill holes
        feather: Apply feathering
        smooth: Smooth edges

    Returns:
        Processed mask
    """
    processed = mask.copy()

    # Remove small components first
    if remove_small:
        processed = remove_small_components(processed)

    # Fill holes
    if fill:
        processed = fill_holes(processed)

    # Smooth edges (do this before feathering for better results)
    if smooth:
        processed = smooth_mask_edges(processed, kernel_size=3)

    # Apply feathering last
    if feather:
        processed = feather_edges(processed)

    return processed


def combine_masks(masks: list[np.ndarray], method: str = "union") -> np.ndarray:
    """Combine multiple masks.

    Args:
        masks: List of binary masks
        method: Combination method ("union" or "intersection")

    Returns:
        Combined mask
    """
    if not masks:
        raise ValueError("No masks to combine")

    if len(masks) == 1:
        return masks[0]

    combined = masks[0].copy()

    for mask in masks[1:]:
        if method == "union":
            combined = np.maximum(combined, mask)
        elif method == "intersection":
            combined = np.minimum(combined, mask)
        else:
            raise ValueError(f"Unknown method: {method}")

    return combined


def dilate_mask(mask: np.ndarray, pixels: int = 5) -> np.ndarray:
    """Dilate mask to include more pixels around object.

    Args:
        mask: Binary mask (H, W)
        pixels: Number of pixels to dilate

    Returns:
        Dilated mask
    """
    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE, (pixels * 2 + 1, pixels * 2 + 1))
    return cv2.dilate(mask, kernel, iterations=1)


def erode_mask(mask: np.ndarray, pixels: int = 5) -> np.ndarray:
    """Erode mask to remove pixels from object edges.

    Args:
        mask: Binary mask (H, W)
        pixels: Number of pixels to erode

    Returns:
        Eroded mask
    """
    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE, (pixels * 2 + 1, pixels * 2 + 1))
    return cv2.erode(mask, kernel, iterations=1)
