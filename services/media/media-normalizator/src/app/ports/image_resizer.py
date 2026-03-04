from abc import ABC, abstractmethod
from io import BytesIO
from pathlib import Path
from typing import Literal, Protocol

from monstrino_core.shared.enums import ResizeMode


class ImageResizerPort(ABC):
    """Интерфейс для изменения размера изображений."""

    @abstractmethod
    async def resize(
        self,
        image_data: bytes | BytesIO,
        width: int | None = None,
        height: int | None = None,
        mode: ResizeMode = ResizeMode.FIT,
        maintain_aspect_ratio: bool = True,
    ) -> bytes:
        """
        Изменить размер изображения.

        Args:
            image_data: Данные исходного изображения
            width: Целевая ширина (None - автоматически)
            height: Целевая высота (None - автоматически)
            mode: Режим изменения размера
            maintain_aspect_ratio: Сохранять ли соотношение сторон

        Returns:
            Данные изображения нового размера
        """
        pass

    @abstractmethod
    async def get_dimensions(self, image_data: bytes | BytesIO) -> tuple[int, int]:
        """
        Получить размеры изображения.

        Args:
            image_data: Данные изображения

        Returns:
            Кортеж (ширина, высота)
        """
        pass
