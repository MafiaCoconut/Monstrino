"""FastAPI application main entry point."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.config import settings
from app.core.logging import get_logger, setup_logging
from app.services.model_loader import device_manager

# Setup logging
setup_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager.

    Handles startup and shutdown events.
    """
    # Startup
    logger.info(
        "service_starting",
        device=device_manager.device,
        device_type=device_manager.device_type,
        max_image_size=settings.max_image_size,
        model_dir=str(settings.model_dir),
    )

    if device_manager.is_gpu:
        logger.info(
            "gpu_detected",
            **device_manager.info,
        )
        logger.info(
            "model_device_configuration",
            groundingdino="cpu (ROCm compatibility)",
            sam2=device_manager.device,
            note="GroundingDINO uses CPU due to CUDA-specific ops incompatibility with ROCm"
        )
    else:
        logger.warning("running_on_cpu_gpu_not_available")

    yield

    # Shutdown
    logger.info("service_shutting_down")


# Create FastAPI app
app = FastAPI(
    title="Background Removal Service",
    description="Production-ready service for object extraction with text prompts using GroundingDINO + SAM2",
    version="1.0.0",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router, tags=["cutout"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        workers=settings.workers,
        log_level=settings.log_level.lower(),
    )
