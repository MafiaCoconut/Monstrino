from abc import ABC, abstractmethod
from io import BytesIO
from pathlib import Path
from typing import Literal, Protocol


class ImageCompressorPort(ABC):
    @abstractmethod
    async def compress(
        self,
        image_data: bytes | BytesIO,
        quality: int = 85,
        optimize: bool = True,
        target_size_kb: int | None = None,
    ) -> bytes:
        """
        Сжать изображение.

        Args:
            image_data: Данные исходного изображения
            quality: Качество сжатия (1-100)
            optimize: Применять ли оптимизацию
            target_size_kb: Целевой размер в КБ (попытка достичь)

        Returns:
            Сжатые данные изображения
        """
        pass

    @abstractmethod
    async def get_file_size(self, image_data: bytes | BytesIO) -> int:
        """
        Получить размер файла изображения в байтах.

        Args:
            image_data: Данные изображения

        Returns:
            Размер в байтах
        """
        pass

    @abstractmethod
    async def optimize_lossless(
        self,
        image_data: bytes | BytesIO,
        remove_metadata: bool = True,
        progressive: bool = True,
    ) -> bytes:
        """
        Оптимизировать изображение без потери качества.

        Применяет техники сжатия без потерь:
        - Оптимизация таблиц Хаффмана для JPEG
        - Максимальное сжатие для PNG
        - Удаление метаданных (EXIF, ICC профили)
        - Прогрессивное кодирование для JPEG

        Args:
            image_data: Данные исходного изображения
            remove_metadata: Удалить метаданные (EXIF и т.д.)
            progressive: Использовать прогрессивное кодирование для JPEG

        Returns:
            Оптимизированные данные изображения
        """
        pass
