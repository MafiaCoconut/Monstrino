"""
Адаптер для управления соотношением сторон изображений.
"""

import asyncio
from io import BytesIO
from typing import Literal

from PIL import Image
from monstrino_core.shared.enums import AspectRatio

from app.ports import AspectRatioManagerPort


class AspectRatioManager(AspectRatioManagerPort):
    """Реализация управления соотношением сторон на основе Pillow."""

    # Методы ресемплинга для качественного изменения размера
    RESAMPLING_METHOD = Image.Resampling.LANCZOS

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
        def _crop() -> bytes:
            # Открываем изображение
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            original_width, original_height = image.size

            # Парсим целевое соотношение сторон
            ratio_str = aspect_ratio.value if isinstance(
                aspect_ratio, AspectRatio) else aspect_ratio
            target_ratio_w, target_ratio_h = self.parse_aspect_ratio(ratio_str)
            target_ratio = target_ratio_w / target_ratio_h

            current_ratio = original_width / original_height

            # Вычисляем размеры обрезки
            if current_ratio > target_ratio:
                # Изображение шире, обрезаем по ширине
                new_width = int(original_height * target_ratio)
                new_height = original_height

                # Вычисляем смещение по горизонтали
                if align == "center":
                    offset_x = (original_width - new_width) // 2
                elif align == "left":
                    offset_x = 0
                elif align == "right":
                    offset_x = original_width - new_width
                else:
                    offset_x = (original_width - new_width) // 2

                offset_y = 0

            else:
                # Изображение выше, обрезаем по высоте
                new_width = original_width
                new_height = int(original_width / target_ratio)

                offset_x = 0

                # Вычисляем смещение по вертикали
                if align == "center":
                    offset_y = (original_height - new_height) // 2
                elif align == "top":
                    offset_y = 0
                elif align == "bottom":
                    offset_y = original_height - new_height
                else:
                    offset_y = (original_height - new_height) // 2

            # Обрезаем изображение
            cropped = image.crop((
                offset_x,
                offset_y,
                offset_x + new_width,
                offset_y + new_height,
            ))

            # Сохраняем результат
            output = BytesIO()
            format_to_save = image.format or "PNG"
            cropped.save(output, format=format_to_save)
            output.seek(0)
            return output.getvalue()

        return await asyncio.to_thread(_crop)

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
        def _resize() -> bytes:
            # Сначала обрезаем до нужного соотношения сторон
            cropped_data = asyncio.run(
                self.crop_to_aspect_ratio(image_data, aspect_ratio))

            # Если не указаны ограничения, возвращаем обрезанное изображение
            if max_width is None and max_height is None:
                return cropped_data

            # Открываем обрезанное изображение
            image = Image.open(BytesIO(cropped_data))
            width, height = image.size

            # Вычисляем новые размеры с учетом ограничений
            if max_width is not None and width > max_width:
                ratio = max_width / width
                width = max_width
                height = int(height * ratio)

            if max_height is not None and height > max_height:
                ratio = max_height / height
                height = max_height
                width = int(width * ratio)

            # Изменяем размер
            resized = image.resize((width, height), self.RESAMPLING_METHOD)

            # Сохраняем результат
            output = BytesIO()
            format_to_save = image.format or "PNG"
            resized.save(output, format=format_to_save)
            output.seek(0)
            return output.getvalue()

        return await asyncio.to_thread(_resize)

    def parse_aspect_ratio(self, ratio_str: str) -> tuple[int, int]:
        """
        Распарсить строку соотношения сторон.

        Args:
            ratio_str: Строка вида "16:9" или "1.78"

        Returns:
            Кортеж (ширина, высота) пропорций
        """
        ratio_str = ratio_str.strip()

        # Проверяем формат "16:9"
        if ":" in ratio_str:
            parts = ratio_str.split(":")
            if len(parts) != 2:
                raise ValueError(
                    f"Некорректный формат соотношения сторон: {ratio_str}")

            try:
                width = int(parts[0].strip())
                height = int(parts[1].strip())
            except ValueError:
                raise ValueError(
                    f"Некорректный формат соотношения сторон: {ratio_str}")

            return width, height

        # Проверяем формат "1.78" (десятичное число)
        try:
            ratio_float = float(ratio_str)
            # Преобразуем в дробь с небольшими целыми числами
            # Для упрощения используем приближение
            if ratio_float >= 1:
                return int(ratio_float * 100), 100
            else:
                return 100, int(100 / ratio_float)
        except ValueError:
            raise ValueError(
                f"Некорректный формат соотношения сторон: {ratio_str}")

    async def get_aspect_ratio(self, image_data: bytes | BytesIO) -> float:
        """
        Получить текущее соотношение сторон изображения.

        Args:
            image_data: Данные изображения

        Returns:
            Соотношение сторон (ширина/высота)
        """
        def _get_ratio() -> float:
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            width, height = image.size
            return width / height

        return await asyncio.to_thread(_get_ratio)
