"""
Адаптер для изменения размера изображений.
"""

import asyncio
from io import BytesIO

from PIL import Image
from monstrino_core.shared.enums import ResizeMode

from app.ports import ImageResizerPort


class ImageResizer(ImageResizerPort):
    """Реализация изменения размера изображений на основе Pillow."""

    # Методы ресемплинга для качественного изменения размера
    RESAMPLING_METHOD = Image.Resampling.LANCZOS

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
        if width is None and height is None:
            raise ValueError(
                "Необходимо указать хотя бы один размер (width или height)")

        def _resize() -> bytes:
            # Открываем изображение
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            original_width, original_height = image.size

            # Вычисляем целевые размеры
            if width is None:
                target_width = int(original_width * (height / original_height))
                target_height = height
            elif height is None:
                target_width = width
                target_height = int(original_height * (width / original_width))
            else:
                target_width = width
                target_height = height

            # Применяем режим изменения размера
            if mode == ResizeMode.FIT:
                # Вписываем в размеры, сохраняя пропорции
                image.thumbnail((target_width, target_height),
                                self.RESAMPLING_METHOD)
                resized_image = image

            elif mode == ResizeMode.FILL:
                # Заполняем область, обрезая лишнее
                img_ratio = original_width / original_height
                target_ratio = target_width / target_height

                if img_ratio > target_ratio:
                    # Изображение шире
                    new_width = int(original_height * target_ratio)
                    offset = (original_width - new_width) // 2
                    image = image.crop(
                        (offset, 0, offset + new_width, original_height))
                else:
                    # Изображение выше
                    new_height = int(original_width / target_ratio)
                    offset = (original_height - new_height) // 2
                    image = image.crop(
                        (0, offset, original_width, offset + new_height))

                resized_image = image.resize(
                    (target_width, target_height), self.RESAMPLING_METHOD)

            elif mode == ResizeMode.STRETCH:
                # Растягиваем до точных размеров
                resized_image = image.resize(
                    (target_width, target_height), self.RESAMPLING_METHOD)

            elif mode == ResizeMode.THUMBNAIL:
                # Создаем миниатюру
                image.thumbnail((target_width, target_height),
                                self.RESAMPLING_METHOD)
                resized_image = image

            else:
                raise ValueError(
                    f"Неизвестный режим изменения размера: {mode}")

            # Сохраняем результат
            output = BytesIO()
            # Сохраняем в исходном формате
            format_to_save = image.format or "PNG"
            resized_image.save(output, format=format_to_save)
            output.seek(0)
            return output.getvalue()

        return await asyncio.to_thread(_resize)

    async def get_dimensions(self, image_data: bytes | BytesIO) -> tuple[int, int]:
        """
        Получить размеры изображения.

        Args:
            image_data: Данные изображения

        Returns:
            Кортеж (ширина, высота)
        """
        def _get_dimensions() -> tuple[int, int]:
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            return image.size

        return await asyncio.to_thread(_get_dimensions)
