"""API routes for background removal service."""

import time
from typing import Annotated, Literal

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel, Field

from app.config import settings
from app.core.exceptions import (
    BackgroundRemovalError,
    DetectionError,
    ImageProcessingError,
    InvalidInputError,
    SegmentationError,
)
from app.core.logging import get_logger
from app.services.model_loader import device_manager
from app.services.segmentation import segmentation_service
from app.utils.image_processing import (
    apply_mask_to_image,
    calculate_bbox_from_mask,
    encode_image_to_base64,
    encode_image_to_bytes,
    load_image_from_bytes,
)
from app.utils.mask_postprocessing import combine_masks, postprocess_mask

logger = get_logger(__name__)

router = APIRouter()


class CutoutResponse(BaseModel):
    """Response model for cutout endpoint (JSON mode)."""

    image_base64: str = Field(description="Base64-encoded output image")
    bbox: tuple[int, int, int, int] = Field(
        description="Bounding box (x1, y1, x2, y2)")
    score: float = Field(description="Detection confidence score")
    label: str = Field(description="Detected object label")
    model_info: dict[str, str] = Field(
        description="Model and device information")
    timings_ms: dict[str, float] = Field(
        description="Timing information in milliseconds")


class HealthResponse(BaseModel):
    """Response model for health check."""

    status: str
    device: dict[str, str]
    models_loaded: dict[str, bool]


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Health check endpoint.

    Returns:
        Health status and device information
    """
    return HealthResponse(
        status="healthy",
        device=device_manager.info,
        models_loaded={
            "grounding_dino": segmentation_service._detection_model_loaded,
            "sam2": segmentation_service._sam_model_loaded,
        },
    )


@router.post("/cutout", response_model=None)
async def cutout(
    image: Annotated[UploadFile, File(description="Input image (jpg/png/webp)")],
    prompt: Annotated[str, Form(description='Text description of object to extract (e.g., "red backpack")')],
    mode: Annotated[
        Literal["best", "largest", "all"],
        Form(description="Object selection mode: best (highest confidence), largest (biggest area), or all"),
    ] = "best",
    output_format: Annotated[
        Literal["png", "webp"],
        Form(description="Output image format"),
    ] = "png",
    return_json: Annotated[
        bool,
        Form(description="Return JSON with base64 image instead of binary"),
    ] = False,
):
    """Extract object from image based on text prompt.

    This endpoint performs the following steps:
    1. Detect objects matching the prompt using GroundingDINO
    2. Segment detected objects using SAM2
    3. Apply postprocessing to clean up the mask
    4. Create transparent background image

    Args:
        image: Input image file
        prompt: Text description of what to keep
        mode: How to select objects (best/largest/all)
        output_format: Output format (png/webp)
        return_json: Return JSON instead of binary image

    Returns:
        Binary image with transparent background OR JSON with base64 image

    Raises:
        HTTPException: On various errors (400, 422, 500)
    """
    start_time = time.time()
    timings = {}

    try:
        # Validate input
        if not prompt or not prompt.strip():
            raise InvalidInputError("Prompt cannot be empty")

        if not image.content_type or not image.content_type.startswith("image/"):
            raise InvalidInputError(f"Invalid file type: {image.content_type}")

        logger.info(
            "cutout_request_received",
            prompt=prompt,
            mode=mode,
            output_format=output_format,
            return_json=return_json,
            content_type=image.content_type,
        )

        # Load image
        t0 = time.time()
        image_bytes = await image.read()
        image_array = load_image_from_bytes(image_bytes)
        timings["image_load_ms"] = (time.time() - t0) * 1000

        logger.debug("image_loaded", shape=image_array.shape)

        # Run segmentation pipeline
        t0 = time.time()
        results = segmentation_service.process(
            image=image_array,
            prompt=prompt,
            mode=mode,
        )
        timings["inference_ms"] = (time.time() - t0) * 1000

        if not results:
            raise DetectionError(
                f"No objects matching '{prompt}' found in the image")

        # Process masks
        t0 = time.time()
        processed_masks = []
        for result in results:
            processed_mask = postprocess_mask(
                result.mask,
                remove_small=True,
                fill=True,
                feather=True,
                smooth=True,
            )
            processed_masks.append(processed_mask)

        # Combine masks if multiple (for "all" mode)
        if len(processed_masks) > 1:
            final_mask = combine_masks(processed_masks, method="union")
        else:
            final_mask = processed_masks[0]

        timings["postprocess_ms"] = (time.time() - t0) * 1000

        # Apply mask to create transparent background
        t0 = time.time()
        output_image = apply_mask_to_image(
            image=image_array,
            mask=final_mask,
            crop=True,
            padding=10,
        )
        timings["compose_ms"] = (time.time() - t0) * 1000

        # Calculate final bbox
        bbox = calculate_bbox_from_mask(final_mask)

        # Use first result's metadata (or best if multiple)
        best_result = max(results, key=lambda r: r.score)

        # Total time
        timings["total_ms"] = (time.time() - start_time) * 1000

        logger.info(
            "cutout_complete",
            prompt=prompt,
            mode=mode,
            num_objects=len(results),
            score=best_result.score,
            bbox=bbox,
            output_shape=output_image.shape,
            total_time_ms=timings["total_ms"],
        )

        # Return response
        if return_json:
            # JSON response with base64
            image_base64 = encode_image_to_base64(
                output_image,
                format=output_format,
            )

            return CutoutResponse(
                image_base64=image_base64,
                bbox=bbox,
                score=best_result.score,
                label=best_result.label,
                model_info={
                    "device": device_manager.device,
                    "device_type": device_manager.device_type,
                    "detector": "GroundingDINO",
                    "segmenter": "SAM2",
                },
                timings_ms=timings,
            )
        else:
            # Binary response
            t0 = time.time()
            output_bytes = encode_image_to_bytes(
                output_image,
                format=output_format,
            )
            timings["encode_ms"] = (time.time() - t0) * 1000

            media_type = f"image/{output_format}"

            return Response(
                content=output_bytes,
                media_type=media_type,
                headers={
                    "X-Score": str(best_result.score),
                    "X-BBox": f"{bbox[0]},{bbox[1]},{bbox[2]},{bbox[3]}",
                    "X-Label": best_result.label,
                    "X-Inference-Time-Ms": str(timings["inference_ms"]),
                },
            )

    except InvalidInputError as e:
        logger.warning("invalid_input", error=str(e))
        raise HTTPException(status_code=400, detail=str(e))

    except (ImageProcessingError, DetectionError) as e:
        logger.error("processing_error", error=str(e))
        raise HTTPException(status_code=422, detail=str(e))

    except SegmentationError as e:
        logger.error("segmentation_error", error=str(e))
        raise HTTPException(
            status_code=500, detail=f"Segmentation failed: {e}")

    except BackgroundRemovalError as e:
        logger.error("background_removal_error", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        logger.error("unexpected_error", error=str(e),
                     error_type=type(e).__name__)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/")
async def root() -> dict[str, str]:
    """Root endpoint with service information."""
    return {
        "service": "Background Removal Service",
        "version": "1.0.0",
        "endpoints": {
            "health": "GET /health",
            "cutout": "POST /cutout",
        },
    }
