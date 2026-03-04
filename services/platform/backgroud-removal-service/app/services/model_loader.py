"""Model loader and device management."""

import os
from pathlib import Path
from typing import Literal, Optional

import torch
from huggingface_hub import hf_hub_download

from app.config import settings
from app.core.exceptions import ModelLoadError
from app.core.logging import get_logger

logger = get_logger(__name__)


def detect_device() -> tuple[str, str]:
    """Detect the best available device for inference.

    Returns:
        Tuple of (device_type, device_string) where:
        - device_type: "rocm", "cuda", or "cpu"
        - device_string: torch device string like "cuda:0" or "cpu"
    """
    if settings.device != "auto":
        # Manual device selection
        if settings.device == "rocm":
            if torch.cuda.is_available():
                device_type = "rocm"
                device_str = f"cuda:{torch.cuda.current_device()}"
                logger.info(
                    "device_manually_selected",
                    device_type=device_type,
                    device=device_str,
                    gpu_name=torch.cuda.get_device_name(
                        0) if torch.cuda.is_available() else None,
                )
                return device_type, device_str
            else:
                logger.warning(
                    "rocm_not_available_fallback_to_cpu",
                    requested=settings.device,
                )
                return "cpu", "cpu"
        elif settings.device == "cuda":
            if torch.cuda.is_available():
                device_str = f"cuda:{torch.cuda.current_device()}"
                logger.info("device_manually_selected",
                            device="cuda", device_str=device_str)
                return "cuda", device_str
            else:
                logger.warning("cuda_not_available_fallback_to_cpu")
                return "cpu", "cpu"
        else:
            logger.info("device_manually_selected", device="cpu")
            return "cpu", "cpu"

    # Auto-detect device
    if torch.cuda.is_available():
        # Check if it's ROCm or CUDA
        device_str = f"cuda:{torch.cuda.current_device()}"
        gpu_name = torch.cuda.get_device_name(0)

        # ROCm typically shows AMD GPU names
        if "AMD" in gpu_name or "Radeon" in gpu_name:
            device_type = "rocm"
        else:
            device_type = "cuda"

        logger.info(
            "device_auto_detected",
            device_type=device_type,
            device=device_str,
            gpu_name=gpu_name,
            gpu_count=torch.cuda.device_count(),
        )
        return device_type, device_str
    else:
        logger.info("device_auto_detected", device="cpu")
        return "cpu", "cpu"


def download_model_weights(
    repo_id: str,
    filename: str,
    cache_dir: Optional[Path] = None,
) -> Path:
    """Download model weights from HuggingFace Hub.

    Args:
        repo_id: HuggingFace repository ID
        filename: Model filename
        cache_dir: Cache directory (default: settings.model_dir)

    Returns:
        Path to downloaded model file

    Raises:
        ModelLoadError: If download fails
    """
    try:
        cache_path = cache_dir or settings.model_dir
        logger.info(
            "downloading_model",
            repo_id=repo_id,
            filename=filename,
            cache_dir=str(cache_path),
        )

        # Set HuggingFace cache
        os.environ["HF_HOME"] = str(settings.hf_home)

        model_path = hf_hub_download(
            repo_id=repo_id,
            filename=filename,
            cache_dir=str(cache_path),
        )

        logger.info("model_downloaded", path=model_path)
        return Path(model_path)

    except Exception as e:
        logger.error("model_download_failed", repo_id=repo_id,
                     filename=filename, error=str(e))
        raise ModelLoadError(
            f"Failed to download model {repo_id}/{filename}: {e}") from e


def get_sam2_checkpoint(model_size: Literal["tiny", "small", "base", "large"] = "small") -> Path:
    """Get SAM2 checkpoint path, downloading if necessary.

    Args:
        model_size: Model size (tiny, small, base, large)

    Returns:
        Path to SAM2 checkpoint
    """
    model_files = {
        "tiny": "sam2_hiera_tiny.pt",
        "small": "sam2_hiera_small.pt",
        "base": "sam2_hiera_base_plus.pt",
        "large": "sam2_hiera_large.pt",
    }

    filename = model_files[model_size]
    checkpoint_path = settings.model_dir / filename

    if checkpoint_path.exists():
        logger.info("sam2_checkpoint_found", path=str(checkpoint_path))
        return checkpoint_path

    # Download from HuggingFace
    logger.info("sam2_checkpoint_not_found_downloading", model_size=model_size)
    return download_model_weights(
        repo_id="facebook/sam2-hiera-small",
        filename=filename,
        cache_dir=settings.model_dir,
    )


def get_groundingdino_checkpoint() -> Path:
    """Get GroundingDINO checkpoint path, downloading if necessary.

    Returns:
        Path to GroundingDINO checkpoint
    """
    checkpoint_path = settings.model_dir / "groundingdino_swint_ogc.pth"

    if checkpoint_path.exists():
        logger.info("groundingdino_checkpoint_found",
                    path=str(checkpoint_path))
        return checkpoint_path

    # Download from HuggingFace
    logger.info("groundingdino_checkpoint_not_found_downloading")
    return download_model_weights(
        repo_id="ShilongLiu/GroundingDINO",
        filename="groundingdino_swint_ogc.pth",
        cache_dir=settings.model_dir,
    )


class DeviceManager:
    """Manages device selection and model placement."""

    def __init__(self) -> None:
        self.device_type, self.device = detect_device()
        self.torch_device = torch.device(self.device)

    def to_device(self, tensor: torch.Tensor) -> torch.Tensor:
        """Move tensor to device.

        Args:
            tensor: Input tensor

        Returns:
            Tensor on device
        """
        return tensor.to(self.torch_device)

    @property
    def is_gpu(self) -> bool:
        """Check if using GPU."""
        return self.device_type in ("rocm", "cuda")

    @property
    def info(self) -> dict[str, str]:
        """Get device information."""
        info = {
            "device_type": self.device_type,
            "device": self.device,
        }
        if self.is_gpu and torch.cuda.is_available():
            info["gpu_name"] = torch.cuda.get_device_name(0)
            info["gpu_count"] = str(torch.cuda.device_count())
        return info


# Global device manager
device_manager = DeviceManager()
