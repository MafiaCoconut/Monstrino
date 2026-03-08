"""
Адаптер для добавления водяных знаков на изображения.
"""

import asyncio
from io import BytesIO
from typing import cast

from PIL import Image, ImageDraw, ImageFont
from monstrino_core.shared.enums import WatermarkPosition

from app.ports import ImageWatermarkerPort


class ImageWatermarker(ImageWatermarkerPort):
    """Реализация добавления водяных знаков на основе Pillow."""

    # Размер шрифта для текстовых водяных знаков (относительно высоты изображения)
    FONT_SIZE_RATIO = 0.05

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
        if not 0.0 <= opacity <= 1.0:
            raise ValueError("Прозрачность должна быть в диапазоне 0.0-1.0")
        if not 0.0 <= scale <= 1.0:
            raise ValueError("Масштаб должен быть в диапазоне 0.0-1.0")

        def _add_watermark() -> bytes:
            # Открываем основное изображение
            if isinstance(image_data, bytes):
                base_image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                base_image = Image.open(image_data)

            # Конвертируем в RGBA для работы с прозрачностью
            if base_image.mode != "RGBA":
                base_image = base_image.convert("RGBA")

            # Определяем, текст это или изображение
            if isinstance(watermark_data, str):
                watermark_layer = self._create_text_watermark(
                    base_image, watermark_data, opacity, scale
                )
            else:
                watermark_layer = self._create_image_watermark(
                    base_image, watermark_data, opacity, scale
                )

            # Вычисляем позицию
            position_coords = self._calculate_position(
                base_image.size, watermark_layer.size, position, padding
            )

            # Накладываем водяной знак
            result = Image.new("RGBA", base_image.size, (0, 0, 0, 0))
            result.paste(base_image, (0, 0))
            result.paste(watermark_layer, position_coords, watermark_layer)

            # Конвертируем обратно в исходный режим, если нужно
            original_mode = image_data.format if hasattr(
                image_data, "format") else "PNG"
            if original_mode == "JPEG":
                # Для JPEG конвертируем в RGB
                rgb_result = Image.new("RGB", result.size, (255, 255, 255))
                rgb_result.paste(result, mask=result.split()[3])
                result = rgb_result

            # Сохраняем результат
            output = BytesIO()
            format_to_save = base_image.format or "PNG"
            result.save(output, format=format_to_save)
            output.seek(0)
            return output.getvalue()

        return await asyncio.to_thread(_add_watermark)

    def _create_text_watermark(
        self,
        base_image: Image.Image,
        text: str,
        opacity: float,
        scale: float,
    ) -> Image.Image:
        """Создать текстовый водяной знак."""
        # Вычисляем размер шрифта
        font_size = int(base_image.height * self.FONT_SIZE_RATIO * scale * 5)

        # Пытаемся загрузить шрифт, если не получается - используем default
        try:
            font = ImageFont.truetype("DejaVuSans.ttf", font_size)
        except (OSError, IOError):
            try:
                font = ImageFont.truetype(
                    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
            except (OSError, IOError):
                font = ImageFont.load_default()

        # Создаем временное изображение для измерения текста
        temp_img = Image.new("RGBA", (1, 1))
        temp_draw = ImageDraw.Draw(temp_img)

        # Получаем размеры текста
        bbox = temp_draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]

        # Создаем слой для текста
        text_layer = Image.new(
            "RGBA", (text_width + 20, text_height + 20), (0, 0, 0, 0))
        draw = ImageDraw.Draw(text_layer)

        # Рисуем текст с прозрачностью
        alpha = int(255 * opacity)
        draw.text(
            (10, 10),
            text,
            fill=(255, 255, 255, alpha),
            font=font,
        )

        return text_layer

    def _create_image_watermark(
        self,
        base_image: Image.Image,
        watermark_data: bytes | BytesIO,
        opacity: float,
        scale: float,
    ) -> Image.Image:
        """Создать водяной знак из изображения."""
        # Открываем водяной знак
        if isinstance(watermark_data, bytes):
            watermark = Image.open(BytesIO(watermark_data))
        else:
            watermark_data.seek(0)
            watermark = Image.open(watermark_data)

        # Конвертируем в RGBA
        if watermark.mode != "RGBA":
            watermark = watermark.convert("RGBA")

        # Масштабируем водяной знак
        base_width, base_height = base_image.size
        target_width = int(base_width * scale)

        # Вычисляем пропорциональную высоту
        wm_width, wm_height = watermark.size
        target_height = int(wm_height * (target_width / wm_width))

        watermark = watermark.resize(
            (target_width, target_height), Image.Resampling.LANCZOS)

        # Применяем прозрачность
        if opacity < 1.0:
            alpha = watermark.split()[3]
            alpha = alpha.point(lambda p: int(p * opacity))
            watermark.putalpha(alpha)

        return watermark

    def _calculate_position(
        self,
        base_size: tuple[int, int],
        watermark_size: tuple[int, int],
        position: WatermarkPosition,
        padding: int,
    ) -> tuple[int, int]:
        """Вычислить координаты для размещения водяного знака."""
        base_width, base_height = base_size
        wm_width, wm_height = watermark_size

        positions = {
            WatermarkPosition.TOP_LEFT: (padding, padding),
            WatermarkPosition.TOP_RIGHT: (base_width - wm_width - padding, padding),
            WatermarkPosition.BOTTOM_LEFT: (padding, base_height - wm_height - padding),
            WatermarkPosition.BOTTOM_RIGHT: (
                base_width - wm_width - padding,
                base_height - wm_height - padding,
            ),
            WatermarkPosition.CENTER: (
                (base_width - wm_width) // 2,
                (base_height - wm_height) // 2,
            ),
        }

        return positions[position]
