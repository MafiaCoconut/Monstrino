#!/usr/bin/env python3
"""Test script to verify the service is working correctly."""

from app.utils.mask_postprocessing import postprocess_mask
from app.utils.image_processing import apply_mask_to_image, encode_image_to_bytes
from app.services.segmentation import segmentation_service
from app.services.model_loader import device_manager
from app.core.logging import get_logger, setup_logging
from app.config import settings
import io
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

# Add app to path
sys.path.insert(0, str(Path(__file__).parent))


setup_logging()
logger = get_logger(__name__)


def create_test_image(size: tuple[int, int] = (640, 480)) -> np.ndarray:
    """Create a test image with colored shapes."""
    image = Image.new("RGB", size, color=(240, 240, 240))
    draw = ImageDraw.Draw(image)

    # Draw red rectangle
    draw.rectangle([200, 150, 400, 350], fill=(220, 50, 50))

    # Draw blue circle
    draw.ellipse([50, 50, 150, 150], fill=(50, 50, 220))

    # Draw green triangle
    draw.polygon([(500, 100), (600, 300), (400, 300)], fill=(50, 220, 50))

    return np.array(image)


def test_device():
    """Test device detection."""
    print("\n" + "="*60)
    print("DEVICE TEST")
    print("="*60)

    print(f"Device type: {device_manager.device_type}")
    print(f"Device: {device_manager.device}")
    print(f"Is GPU: {device_manager.is_gpu}")

    if device_manager.is_gpu:
        print(f"GPU info: {device_manager.info}")
        print("✅ GPU detected")
    else:
        print("⚠️  Running on CPU")

    return True


def test_segmentation():
    """Test segmentation pipeline."""
    print("\n" + "="*60)
    print("SEGMENTATION TEST")
    print("="*60)

    try:
        # Create test image
        print("Creating test image...")
        image = create_test_image()
        print(f"✅ Test image created: {image.shape}")

        # Test detection and segmentation
        prompts = ["red rectangle", "blue circle", "green triangle"]

        for prompt in prompts:
            print(f"\nTesting prompt: '{prompt}'")

            try:
                results = segmentation_service.process(
                    image=image,
                    prompt=prompt,
                    mode="best",
                )

                if results:
                    result = results[0]
                    print(f"  ✅ Detection successful")
                    print(f"     Score: {result.score:.3f}")
                    print(f"     BBox: {result.bbox}")
                    print(f"     Label: {result.label}")
                    print(
                        f"     Inference time: {result.inference_time_ms:.1f}ms")
                    print(f"     Mask shape: {result.mask.shape}")
                    print(f"     Mask pixels: {np.sum(result.mask > 0)}")
                else:
                    print(f"  ⚠️  No objects detected")

            except Exception as e:
                print(f"  ❌ Error: {e}")
                return False

        print("\n✅ Segmentation test passed")
        return True

    except Exception as e:
        print(f"\n❌ Segmentation test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_postprocessing():
    """Test mask postprocessing."""
    print("\n" + "="*60)
    print("POSTPROCESSING TEST")
    print("="*60)

    try:
        # Create test mask
        mask = np.zeros((100, 100), dtype=np.uint8)
        mask[30:70, 30:70] = 255
        mask[45:55, 45:55] = 0  # hole
        mask[5:10, 5:10] = 255  # small artifact

        print("Original mask:")
        print(f"  Total pixels: {np.sum(mask > 0)}")

        # Process mask
        processed = postprocess_mask(mask)

        print("Processed mask:")
        print(f"  Total pixels: {np.sum(processed > 0)}")

        # Check that hole is filled
        hole_filled = np.sum(processed[45:55, 45:55] > 0) > 0

        # Check that artifact is removed
        artifact_removed = np.sum(processed[5:10, 5:10]) == 0

        if hole_filled and artifact_removed:
            print("✅ Postprocessing test passed")
            return True
        else:
            print("❌ Postprocessing test failed:")
            print(f"  Hole filled: {hole_filled}")
            print(f"  Artifact removed: {artifact_removed}")
            return False

    except Exception as e:
        print(f"❌ Postprocessing test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_full_pipeline():
    """Test full pipeline."""
    print("\n" + "="*60)
    print("FULL PIPELINE TEST")
    print("="*60)

    try:
        # Create test image
        print("Creating test image...")
        image = create_test_image()

        # Run segmentation
        print("Running segmentation...")
        results = segmentation_service.process(
            image=image,
            prompt="red rectangle",
            mode="best",
        )

        if not results:
            print("❌ No objects detected")
            return False

        result = results[0]

        # Postprocess mask
        print("Postprocessing mask...")
        processed_mask = postprocess_mask(result.mask)

        # Apply mask to image
        print("Applying mask to image...")
        output_image = apply_mask_to_image(image, processed_mask)

        # Encode to bytes
        print("Encoding to PNG...")
        output_bytes = encode_image_to_bytes(output_image, format="png")

        print(f"\n✅ Full pipeline test passed")
        print(f"   Output image shape: {output_image.shape}")
        print(f"   Output size: {len(output_bytes)} bytes")
        print(f"   Has alpha channel: {output_image.shape[2] == 4}")

        # Save test output
        output_path = Path("test_output.png")
        with open(output_path, "wb") as f:
            f.write(output_bytes)
        print(f"   Test output saved to: {output_path}")

        return True

    except Exception as e:
        print(f"❌ Full pipeline test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Run all tests."""
    print("\n" + "="*60)
    print("BACKGROUND REMOVAL SERVICE - TEST SUITE")
    print("="*60)

    tests = [
        ("Device Detection", test_device),
        ("Mask Postprocessing", test_postprocessing),
        ("Segmentation", test_segmentation),
        ("Full Pipeline", test_full_pipeline),
    ]

    results = []

    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n❌ {name} crashed: {e}")
            results.append((name, False))

    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)

    passed = sum(1 for _, result in results if result)
    total = len(results)

    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")

    print(f"\nTotal: {passed}/{total} tests passed")

    if passed == total:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) failed")
        return 1


if __name__ == "__main__":
    sys.exit(main())
