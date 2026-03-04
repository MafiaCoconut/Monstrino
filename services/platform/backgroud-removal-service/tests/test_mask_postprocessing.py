"""Tests for mask postprocessing utilities."""

import numpy as np
import pytest

from app.utils.mask_postprocessing import (
    combine_masks,
    dilate_mask,
    erode_mask,
    feather_edges,
    fill_holes,
    postprocess_mask,
    remove_small_components,
    smooth_mask_edges,
)


def create_test_mask(size: int = 100) -> np.ndarray:
    """Create a simple test mask."""
    mask = np.zeros((size, size), dtype=np.uint8)
    # Add a square in the center
    mask[30:70, 30:70] = 255
    return mask


def test_remove_small_components():
    """Test removing small components from mask."""
    mask = np.zeros((100, 100), dtype=np.uint8)

    # Add large component
    mask[20:80, 20:80] = 255

    # Add small components
    mask[5:10, 5:10] = 255
    mask[90:95, 90:95] = 255

    # Remove small components (min_area=100)
    cleaned = remove_small_components(mask, min_area=100)

    # Large component should remain
    assert np.any(cleaned[40:60, 40:60] == 255)

    # Small components should be removed
    assert np.all(cleaned[5:10, 5:10] == 0)
    assert np.all(cleaned[90:95, 90:95] == 0)


def test_fill_holes():
    """Test filling holes in mask."""
    mask = np.zeros((100, 100), dtype=np.uint8)

    # Create outer square
    mask[20:80, 20:80] = 255

    # Create hole
    mask[40:60, 40:60] = 0

    # Fill holes
    filled = fill_holes(mask)

    # Hole should be filled
    assert np.all(filled[40:60, 40:60] == 255)

    # Outer area should remain zero
    assert np.all(filled[0:10, 0:10] == 0)


def test_feather_edges():
    """Test feathering mask edges."""
    mask = create_test_mask()

    # Apply feathering
    feathered = feather_edges(mask, radius=5)

    # Center should still be 255
    assert feathered[50, 50] == 255

    # Edges should have intermediate values (not just 0 or 255)
    edge_values = feathered[30:35, 50]
    assert np.any((edge_values > 0) & (edge_values < 255))


def test_smooth_mask_edges():
    """Test smoothing mask edges."""
    mask = create_test_mask()

    # Add noise to edges
    mask[30:32, 30:70] = 0
    mask[68:70, 30:70] = 0

    # Smooth edges
    smoothed = smooth_mask_edges(mask, kernel_size=5)

    # Should have some effect on edges
    assert not np.array_equal(mask, smoothed)


def test_postprocess_mask():
    """Test full postprocessing pipeline."""
    mask = np.zeros((100, 100), dtype=np.uint8)

    # Create main mask with hole and small components
    mask[20:80, 20:80] = 255
    mask[40:60, 40:60] = 0  # hole
    mask[5:10, 5:10] = 255  # small component

    # Process
    processed = postprocess_mask(
        mask,
        remove_small=True,
        fill=True,
        feather=False,
        smooth=False,
    )

    # Main area should be filled
    assert np.any(processed[40:60, 40:60] > 0)

    # Small component should be removed
    assert np.all(processed[5:10, 5:10] == 0)


def test_combine_masks_union():
    """Test combining masks with union."""
    mask1 = np.zeros((100, 100), dtype=np.uint8)
    mask1[20:50, 20:50] = 255

    mask2 = np.zeros((100, 100), dtype=np.uint8)
    mask2[40:70, 40:70] = 255

    # Union
    combined = combine_masks([mask1, mask2], method="union")

    # Both regions should be present
    assert np.all(combined[25:45, 25:45] == 255)
    assert np.all(combined[45:65, 45:65] == 255)


def test_combine_masks_intersection():
    """Test combining masks with intersection."""
    mask1 = np.zeros((100, 100), dtype=np.uint8)
    mask1[20:60, 20:60] = 255

    mask2 = np.zeros((100, 100), dtype=np.uint8)
    mask2[40:80, 40:80] = 255

    # Intersection
    combined = combine_masks([mask1, mask2], method="intersection")

    # Only overlapping region should be present
    assert np.all(combined[45:55, 45:55] == 255)
    assert np.all(combined[25:35, 25:35] == 0)


def test_dilate_mask():
    """Test mask dilation."""
    mask = create_test_mask()
    original_area = np.sum(mask > 0)

    # Dilate
    dilated = dilate_mask(mask, pixels=5)
    dilated_area = np.sum(dilated > 0)

    # Area should increase
    assert dilated_area > original_area


def test_erode_mask():
    """Test mask erosion."""
    mask = create_test_mask()
    original_area = np.sum(mask > 0)

    # Erode
    eroded = erode_mask(mask, pixels=5)
    eroded_area = np.sum(eroded > 0)

    # Area should decrease
    assert eroded_area < original_area


def test_empty_mask():
    """Test handling of empty mask."""
    mask = np.zeros((100, 100), dtype=np.uint8)

    # Should not crash
    processed = postprocess_mask(mask)

    # Should remain empty
    assert np.all(processed == 0)


def test_full_mask():
    """Test handling of full mask."""
    mask = np.ones((100, 100), dtype=np.uint8) * 255

    # Should not crash
    processed = postprocess_mask(mask)

    # Should remain mostly full (some edge effects possible)
    assert np.sum(processed > 0) > 0.9 * mask.size


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
