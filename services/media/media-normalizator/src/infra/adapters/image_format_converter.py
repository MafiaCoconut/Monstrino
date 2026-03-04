"""
Адаптер для конвертации форматов изображений.
"""

import asyncio
from io import BytesIO
from typing import Any

from PIL import Image
from monstrino_core.shared.enums import ImageFormat

from app.ports import ImageFormatConverterPort


class ImageFormatConverter(ImageFormatConverterPort):
    # Маппинг форматов для Pillow
    FORMAT_MAPPING = {
        ImageFormat.JPEG: "JPEG",
        ImageFormat.PNG: "PNG",
        ImageFormat.WEBP: "WEBP",
        ImageFormat.BMP: "BMP",
        ImageFormat.GIF: "GIF",
        ImageFormat.TIFF: "TIFF",
    }

    # Параметры по умолчанию для разных форматов
    DEFAULT_QUALITY = {
        ImageFormat.JPEG: 85,
        ImageFormat.WEBP: 85,
    }

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
        def _convert() -> bytes:
            # Открываем изображение
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            # Конвертируем RGBA в RGB для JPEG
            if target_format == ImageFormat.JPEG and image.mode in ("RGBA", "LA", "P"):
                # Создаем белый фон
                background = Image.new("RGB", image.size, (255, 255, 255))
                if image.mode == "P":
                    image = image.convert("RGBA")
                background.paste(image, mask=image.split()
                                 [-1] if image.mode in ("RGBA", "LA") else None)
                image = background

            # Подготавливаем параметры сохранения
            save_kwargs: dict[str, Any] = {
                "format": self.FORMAT_MAPPING[target_format]}

            # Добавляем quality для форматов, которые его поддерживают
            if target_format in (ImageFormat.JPEG, ImageFormat.WEBP):
                save_kwargs["quality"] = quality or self.DEFAULT_QUALITY[target_format]
                save_kwargs["optimize"] = True

            # Для PNG включаем оптимизацию
            if target_format == ImageFormat.PNG:
                save_kwargs["optimize"] = True

            # Сохраняем в BytesIO
            output = BytesIO()
            image.save(output, **save_kwargs)
            output.seek(0)
            return output.getvalue()

        # Выполняем в пуле потоков, чтобы не блокировать event loop
        return await asyncio.to_thread(_convert)

    async def get_format(self, image_data: bytes | BytesIO) -> ImageFormat:
        """
        Определить формат изображения.

        Args:
            image_data: Данные изображения

        Returns:
            Формат изображения
        """
        def _get_format() -> ImageFormat:
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            format_str = image.format
            if format_str is None:
                raise ValueError("Не удалось определить формат изображения")

            # Ищем соответствующий ImageFormat
            for img_format, pillow_format in self.FORMAT_MAPPING.items():
                if pillow_format == format_str:
                    return img_format

            raise ValueError(
                f"Неподдерживаемый формат изображения: {format_str}")

        return await asyncio.to_thread(_get_format)
