from abc import ABC, abstractmethod
from io import BytesIO
from pathlib import Path
from typing import Literal, Protocol

from monstrino_core.shared.enums import WatermarkPosition


class ImageWatermarkerPort(ABC):
    """Интерфейс для добавления водяных знаков."""

    @abstractmethod
    async def add_watermark(
        self,
        image_data: bytes | BytesIO,
        watermark_data: bytes | BytesIO | str,
        position: WatermarkPosition = WatermarkPosition.BOTTOM_RIGHT,
        opacity: float = 0.5,
        scale: float = 0.2,
        padding: int = 10,
    ) -> bytes:
        """
        Добавить водяной знак на изображение.

        Args:
            image_data: Данные исходного изображения
            watermark_data: Данные водяного знака (изображение или текст)
            position: Позиция водяного знака
            opacity: Прозрачность (0.0-1.0)
            scale: Масштаб водяного знака относительно изображения (0.0-1.0)
            padding: Отступ от края в пикселях

        Returns:
            Данные изображения с водяным знаком
        """
        pass
