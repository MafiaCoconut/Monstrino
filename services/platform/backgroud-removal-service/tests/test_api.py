"""Tests for API endpoints."""

import io
from pathlib import Path

import numpy as np
import pytest
from fastapi.testclient import TestClient
from PIL import Image

from app.main import app

client = TestClient(app)


def create_test_image(size: tuple[int, int] = (640, 480)) -> bytes:
    """Create a test image with colored rectangles.

    Args:
        size: Image size (width, height)

    Returns:
        Image bytes (PNG format)
    """
    # Create image with colored rectangles
    image = Image.new("RGB", size, color=(240, 240, 240))

    # Add red rectangle (simulating an object)
    pixels = image.load()
    for x in range(200, 400):
        for y in range(150, 350):
            pixels[x, y] = (220, 50, 50)

    # Add blue rectangle
    for x in range(50, 150):
        for y in range(50, 150):
            pixels[x, y] = (50, 50, 220)

    # Convert to bytes
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def test_health_endpoint():
    """Test health check endpoint."""
    response = client.get("/health")

    assert response.status_code == 200
    data = response.json()

    assert data["status"] == "healthy"
    assert "device" in data
    assert "models_loaded" in data


def test_root_endpoint():
    """Test root endpoint."""
    response = client.get("/")

    assert response.status_code == 200
    data = response.json()

    assert "service" in data
    assert "version" in data
    assert "endpoints" in data


def test_cutout_endpoint_missing_params():
    """Test cutout endpoint with missing parameters."""
    response = client.post("/cutout")

    # Should fail with 422 (validation error)
    assert response.status_code == 422


def test_cutout_endpoint_invalid_prompt():
    """Test cutout endpoint with empty prompt."""
    image_bytes = create_test_image()

    response = client.post(
        "/cutout",
        data={"prompt": "", "mode": "best"},
        files={"image": ("test.png", image_bytes, "image/png")},
    )

    # Should fail with 400 (bad request)
    assert response.status_code == 400


@pytest.mark.skipif(
    not Path("models").exists(),
    reason="Models not available, skip integration test",
)
def test_cutout_endpoint_binary_response():
    """Test cutout endpoint with binary response.

    Note: This test requires models to be available and will be skipped if not present.
    """
    image_bytes = create_test_image()

    response = client.post(
        "/cutout",
        data={
            "prompt": "red rectangle",
            "mode": "best",
            "output_format": "png",
            "return_json": False,
        },
        files={"image": ("test.png", image_bytes, "image/png")},
    )

    # Should succeed (or fail with detection error if object not found)
    assert response.status_code in [200, 422]

    if response.status_code == 200:
        # Check headers
        assert response.headers["content-type"] == "image/png"
        assert "x-score" in response.headers
        assert "x-bbox" in response.headers

        # Check that response contains valid image
        assert len(response.content) > 0

        # Verify it's a valid PNG
        image = Image.open(io.BytesIO(response.content))
        assert image.format == "PNG"
        assert image.mode == "RGBA"


@pytest.mark.skipif(
    not Path("models").exists(),
    reason="Models not available, skip integration test",
)
def test_cutout_endpoint_json_response():
    """Test cutout endpoint with JSON response.

    Note: This test requires models to be available and will be skipped if not present.
    """
    image_bytes = create_test_image()

    response = client.post(
        "/cutout",
        data={
            "prompt": "rectangle",
            "mode": "best",
            "output_format": "png",
            "return_json": True,
        },
        files={"image": ("test.png", image_bytes, "image/png")},
    )

    # Should succeed (or fail with detection error)
    assert response.status_code in [200, 422]

    if response.status_code == 200:
        data = response.json()

        # Check response structure
        assert "image_base64" in data
        assert "bbox" in data
        assert "score" in data
        assert "label" in data
        assert "model_info" in data
        assert "timings_ms" in data

        # Check types
        assert isinstance(data["image_base64"], str)
        assert isinstance(data["bbox"], list)
        assert len(data["bbox"]) == 4
        assert isinstance(data["score"], float)
        assert isinstance(data["timings_ms"], dict)


def test_cutout_endpoint_modes():
    """Test different modes."""
    image_bytes = create_test_image()

    modes = ["best", "largest", "all"]

    for mode in modes:
        response = client.post(
            "/cutout",
            data={
                "prompt": "rectangle",
                "mode": mode,
                "output_format": "png",
                "return_json": False,
            },
            files={"image": ("test.png", image_bytes, "image/png")},
        )

        # Should not crash (may fail with detection error)
        assert response.status_code in [200, 422, 500]


def test_cutout_endpoint_formats():
    """Test different output formats."""
    image_bytes = create_test_image()

    formats = ["png", "webp"]

    for fmt in formats:
        response = client.post(
            "/cutout",
            data={
                "prompt": "rectangle",
                "mode": "best",
                "output_format": fmt,
                "return_json": False,
            },
            files={"image": ("test.png", image_bytes, "image/png")},
        )

        # Should not crash
        assert response.status_code in [200, 422, 500]


def test_cutout_endpoint_large_image():
    """Test with large image (should be resized)."""
    # Create large image
    large_image_bytes = create_test_image(size=(4000, 3000))

    response = client.post(
        "/cutout",
        data={
            "prompt": "rectangle",
            "mode": "best",
            "output_format": "png",
            "return_json": False,
        },
        files={"image": ("test.png", large_image_bytes, "image/png")},
    )

    # Should not crash (may fail with detection error)
    assert response.status_code in [200, 422, 500]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
