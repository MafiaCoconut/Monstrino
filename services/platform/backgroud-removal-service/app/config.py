"""Application configuration using Pydantic Settings."""

from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Model configuration
    model_dir: Path = Field(default=Path("./models"),
                            description="Directory for model weights")
    device: Literal["auto", "cpu", "cuda", "rocm"] = Field(
        default="auto", description="Device for inference"
    )

    # Model cache
    hf_home: Path = Field(
        default=Path("./cache/huggingface"), description="HuggingFace cache directory"
    )
    torch_home: Path = Field(default=Path(
        "./cache/torch"), description="Torch cache directory")

    # API configuration
    max_image_size: int = Field(
        default=2048, description="Maximum image dimension in pixels")
    default_mode: Literal["best", "largest", "all"] = Field(
        default="best", description="Default object selection mode"
    )

    # Detection thresholds
    box_threshold: float = Field(
        default=0.25, ge=0.0, le=1.0, description="Confidence threshold for bounding boxes"
    )
    text_threshold: float = Field(
        default=0.20, ge=0.0, le=1.0, description="Confidence threshold for text matching"
    )

    # Mask postprocessing
    min_mask_area: int = Field(
        default=100, ge=0, description="Minimum mask area in pixels (removes small artifacts)"
    )
    feather_radius: int = Field(
        default=3, ge=0, description="Feathering radius for mask edges (0 = disabled)"
    )
    fill_holes: bool = Field(
        default=True, description="Fill holes in detected masks")

    # Server configuration
    host: str = Field(default="0.0.0.0", description="Server host")
    port: int = Field(default=8000, ge=1, le=65535, description="Server port")
    workers: int = Field(
        default=1, ge=1, description="Number of worker processes")

    # Logging
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = Field(
        default="INFO", description="Logging level"
    )

    def __init__(self, **kwargs):  # type: ignore
        super().__init__(**kwargs)
        # Create directories if they don't exist
        self.model_dir.mkdir(parents=True, exist_ok=True)
        self.hf_home.mkdir(parents=True, exist_ok=True)
        self.torch_home.mkdir(parents=True, exist_ok=True)


# Global settings instance
settings = Settings()
