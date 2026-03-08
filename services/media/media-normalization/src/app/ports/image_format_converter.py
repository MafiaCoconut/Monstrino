from abc import ABC, abstractmethod
from io import BytesIO
from pathlib import Path
from typing import Literal, Protocol

from monstrino_core.shared.enums import ImageFormat


class ImageFormatConverterPort(ABC):
    """Интерфейс для конвертации форматов изображений."""

    @abstractmethod
    async def convert(
        self,
        image_data: bytes | BytesIO,
        target_format: ImageFormat,
        quality: int | None = None,
    ) -> bytes:
        """
        Конвертировать изображение в другой формат.

        Args:
            image_data: Данные исходного изображения
            target_format: Целевой формат
            quality: Качество для JPEG/WEBP (1-100)

        Returns:
            Данные изображения в новом формате
        """
        pass

    @abstractmethod
    async def get_format(self, image_data: bytes | BytesIO) -> ImageFormat:
        """
        Определить формат изображения.

        Args:
            image_data: Данные изображения

        Returns:
            Формат изображения
        """
        pass
