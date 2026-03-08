"""
Pipeline для обработки изображений с оптимальным порядком операций.
"""

import asyncio
from io import BytesIO
from typing import Literal

from monstrino_core.shared.enums import ImageFormat

from .image_compressor import ImageCompressor
from .image_format_converter import ImageFormatConverter
from .image_resizer import ImageResizer


class ImageProcessingPipeline:
    """
    Оптимальные пайплайны обработки изображений.
    
    Правила:
    1. Изменение размера ВСЕГДА первым (работаем с меньшими данными)
    2. Конвертация формата ПЕРЕД финальной оптимизацией
    3. Оптимизация/сжатие - последний этап
    """

    def __init__(self):
        self.converter = ImageFormatConverter()
        self.compressor = ImageCompressor()
        self.resizer = ImageResizer()

    async def jpeg_to_webp_optimal(
        self,
        image_data: bytes | BytesIO,
        strategy: Literal["quality", "balanced", "size"] = "balanced",
        target_width: int | None = None,
        target_height: int | None = None,
    ) -> bytes:
        """
        Оптимальная конвертация JPEG → WebP.

        Порядок операций:
        1. Resize (если нужно) - уменьшаем объем данных
        2. Конвертация JPEG → WebP с нужным качеством
        3. Финальная оптимизация (опционально)

        Args:
            image_data: Исходное JPEG изображение
            strategy: Стратегия оптимизации
                - "quality": Максимальное качество (lossless WebP)
                - "balanced": Баланс качества и размера (quality=85-90)
                - "size": Минимальный размер (quality=75-80)
            target_width: Целевая ширина (опционально)
            target_height: Целевая высота (опционально)

        Returns:
            Оптимизированное WebP изображение
        """
        processed_data = image_data

        # ШАГ 1: Resize (если нужно) - ВСЕГДА ПЕРВЫМ!
        # Работаем с меньшими данными дальше
        if target_width or target_height:
            processed_data = await self.resizer.resize(
                processed_data,
                width=target_width,
                height=target_height,
            )

        # ШАГ 2: Конвертация в WebP с учетом стратегии
        if strategy == "quality":
            # Максимальное качество: lossless WebP
            # Используем конвертер с высоким quality
            result = await self.converter.convert(
                processed_data,
                target_format=ImageFormat.WEBP,
                quality=95,  # Почти без потерь
            )
            # Дополнительная lossless оптимизация
            result = await self.compressor.optimize_lossless(
                result,
                remove_metadata=True,
                progressive=False,  # Для WebP не актуально
            )

        elif strategy == "balanced":
            # Баланс: quality=85 с оптимизацией
            result = await self.converter.convert(
                processed_data,
                target_format=ImageFormat.WEBP,
                quality=85,
            )

        else:  # strategy == "size"
            # Минимальный размер: quality=75
            result = await self.converter.convert(
                processed_data,
                target_format=ImageFormat.WEBP,
                quality=75,
            )

        return result

    async def optimize_existing_image(
        self,
        image_data: bytes | BytesIO,
        lossless: bool = True,
    ) -> bytes:
        """
        Оптимизация существующего изображения.

        Порядок:
        1. Определяем формат
        2. Применяем соответствующую оптимизацию

        Args:
            image_data: Данные изображения
            lossless: True - без потери качества, False - с сжатием

        Returns:
            Оптимизированное изображение
        """
        if lossless:
            return await self.compressor.optimize_lossless(
                image_data,
                remove_metadata=True,
            )
        else:
            return await self.compressor.compress(
                image_data,
                quality=85,
                optimize=True,
            )

    async def full_optimization_pipeline(
        self,
        image_data: bytes | BytesIO,
        target_format: ImageFormat = ImageFormat.WEBP,
        max_width: int | None = None,
        max_height: int | None = None,
        quality_strategy: Literal["quality", "balanced", "size"] = "balanced",
        target_size_kb: int | None = None,
    ) -> bytes:
        """
        Полный пайплайн оптимизации с максимальной гибкостью.

        ОПТИМАЛЬНЫЙ ПОРЯДОК:
        1. Resize → уменьшаем объем данных для дальнейшей обработки
        2. Format conversion → переводим в целевой формат
        3. Compression/Optimization → финальная оптимизация

        Args:
            image_data: Исходное изображение
            target_format: Целевой формат
            max_width: Максимальная ширина
            max_height: Максимальная высота
            quality_strategy: Стратегия качества
            target_size_kb: Целевой размер файла (если нужен)

        Returns:
            Полностью оптимизированное изображение
        """
        processed = image_data

        # ШАГ 1: RESIZE (если нужно)
        # КРИТИЧНО: делаем ПЕРВЫМ, чтобы дальше работать с меньшим объемом
        if max_width or max_height:
            current_width, current_height = await self.resizer.get_dimensions(processed)
            
            # Ресайзим только если изображение больше лимитов
            needs_resize = (
                (max_width and current_width > max_width) or
                (max_height and current_height > max_height)
            )
            
            if needs_resize:
                processed = await self.resizer.resize(
                    processed,
                    width=max_width,
                    height=max_height,
                )

        # ШАГ 2: FORMAT CONVERSION
        # Определяем качество по стратегии
        quality_map = {
            "quality": 95,
            "balanced": 85,
            "size": 75,
        }
        quality = quality_map[quality_strategy]

        # Конвертируем в целевой формат
        current_format = await self.converter.get_format(processed)
        if current_format != target_format:
            processed = await self.converter.convert(
                processed,
                target_format=target_format,
                quality=quality,
            )

        # ШАГ 3: FINAL OPTIMIZATION
        if target_size_kb:
            # Если нужен конкретный размер - применяем итеративное сжатие
            processed = await self.compressor.compress(
                processed,
                quality=quality,
                optimize=True,
                target_size_kb=target_size_kb,
            )
        elif quality_strategy == "quality":
            # Для максимального качества - lossless оптимизация
            processed = await self.compressor.optimize_lossless(
                processed,
                remove_metadata=True,
            )
        # Для balanced/size качество уже применено на этапе конвертации

        return processed

    async def batch_optimize(
        self,
        images: list[bytes | BytesIO],
        **kwargs,
    ) -> list[bytes]:
        """
        Пакетная обработка изображений параллельно.

        Args:
            images: Список изображений
            **kwargs: Параметры для full_optimization_pipeline

        Returns:
            Список оптимизированных изображений
        """
        tasks = [
            self.full_optimization_pipeline(img, **kwargs)
            for img in images
        ]
        return await asyncio.gather(*tasks)


# Вспомогательные функции для быстрого доступа

async def quick_jpeg_to_webp(
    image_data: bytes | BytesIO,
    quality: Literal["max", "high", "medium", "low"] = "high",
) -> bytes:
    """
    Быстрая конвертация JPEG → WebP.

    Args:
        image_data: JPEG изображение
        quality: Уровень качества
            - "max": 95 (почти без потерь)
            - "high": 85 (отличное качество)
            - "medium": 75 (хорошее качество, меньший размер)
            - "low": 65 (заметное сжатие)
    """
    quality_map = {"max": 95, "high": 85, "medium": 75, "low": 65}
    
    converter = ImageFormatConverter()
    return await converter.convert(
        image_data,
        target_format=ImageFormat.WEBP,
        quality=quality_map[quality],
    )
