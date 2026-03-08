from abc import ABC, abstractmethod
from io import BytesIO
from pathlib import Path
from typing import Literal, Protocol

from monstrino_core.shared.enums import AspectRatio


class AspectRatioManagerPort(ABC):
    """Интерфейс для управления соотношением сторон."""

    @abstractmethod
    async def crop_to_aspect_ratio(
        self,
        image_data: bytes | BytesIO,
        aspect_ratio: AspectRatio | str,
        align: Literal["center", "top", "bottom", "left", "right"] = "center",
    ) -> bytes:
        """
        Обрезать изображение до заданного соотношения сторон.

        Args:
            image_data: Данные исходного изображения
            aspect_ratio: Целевое соотношение сторон
            align: Точка выравнивания при обрезке

        Returns:
            Обрезанное изображение
        """
        pass

    @abstractmethod
    async def resize_to_aspect_ratio(
        self,
        image_data: bytes | BytesIO,
        aspect_ratio: AspectRatio | str,
        max_width: int | None = None,
        max_height: int | None = None,
    ) -> bytes:
        """
        Изменить размер изображения с сохранением соотношения сторон.

        Args:
            image_data: Данные исходного изображения
            aspect_ratio: Целевое соотношение сторон
            max_width: Максимальная ширина
            max_height: Максимальная высота

        Returns:
            Изображение с новым соотношением сторон
        """
        pass

    @abstractmethod
    def parse_aspect_ratio(self, ratio_str: str) -> tuple[int, int]:
        """
        Распарсить строку соотношения сторон.

        Args:
            ratio_str: Строка вида "16:9" или "1.78"

        Returns:
            Кортеж (ширина, высота) пропорций
        """
        pass

    @abstractmethod
    async def get_aspect_ratio(self, image_data: bytes | BytesIO) -> float:
        """
        Получить текущее соотношение сторон изображения.

        Args:
            image_data: Данные изображения

        Returns:
            Соотношение сторон (ширина/высота)
        """
        pass
