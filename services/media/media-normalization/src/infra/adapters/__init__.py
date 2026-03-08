"""
Адаптеры для обработки изображений.
"""

from .image_format_converter import ImageFormatConverter
from .image_resizer import ImageResizer
from .image_compressor import ImageCompressorPort
from .image_watermarker import ImageWatermarker
from .aspect_ratio_manager import AspectRatioManager
from .image_pipeline import ImageProcessingPipeline, quick_jpeg_to_webp

__all__ = [
    "ImageFormatConverter",
    "ImageResizer",
    "ImageCompressorPort",
    "ImageWatermarker",
    "AspectRatioManager",
    "ImageProcessingPipeline",
    "quick_jpeg_to_webp",
]
