import asyncio
from io import BytesIO

from PIL import Image

from app.ports import ImageCompressorPort


class ImageCompressor(ImageCompressorPort):
    # Минимальное качество при попытке достичь целевого размера
    MIN_QUALITY = 20
    # Шаг уменьшения качества
    QUALITY_STEP = 5

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
        if not 1 <= quality <= 100:
            raise ValueError("Качество должно быть в диапазоне 1-100")

        def _compress() -> bytes:
            # Открываем изображение
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            original_format = image.format or "PNG"

            # Если указан целевой размер, пытаемся его достичь
            if target_size_kb is not None:
                return self._compress_to_target_size(image, original_format, target_size_kb, optimize)

            # Иначе просто сжимаем с заданным качеством
            return self._compress_with_quality(image, original_format, quality, optimize)

        return await asyncio.to_thread(_compress)

    def _compress_with_quality(
        self,
        image: Image.Image,
        format_str: str,
        quality: int,
        optimize: bool,
    ) -> bytes:
        """Сжать изображение с заданным качеством."""
        output = BytesIO()

        save_kwargs = {"format": format_str}

        # Для JPEG и WEBP применяем quality
        if format_str in ("JPEG", "WEBP"):
            save_kwargs["quality"] = quality
            save_kwargs["optimize"] = optimize

        # Для PNG применяем optimize
        elif format_str == "PNG":
            save_kwargs["optimize"] = optimize
            # Можно также применить compress_level (0-9)
            if optimize:
                save_kwargs["compress_level"] = 9

        image.save(output, **save_kwargs)
        output.seek(0)
        return output.getvalue()

    def _compress_to_target_size(
        self,
        image: Image.Image,
        format_str: str,
        target_size_kb: int,
        optimize: bool,
    ) -> bytes:
        """
        Попытаться сжать изображение до целевого размера.

        Алгоритм: начинаем с высокого качества и постепенно уменьшаем,
        пока не достигнем целевого размера или минимального качества.
        """
        target_size_bytes = target_size_kb * 1024
        current_quality = 95

        # Для форматов без поддержки quality (например, PNG)
        # просто сжимаем один раз
        if format_str not in ("JPEG", "WEBP"):
            return self._compress_with_quality(image, format_str, current_quality, optimize)

        best_result = None
        best_size_diff = float("inf")

        while current_quality >= self.MIN_QUALITY:
            compressed = self._compress_with_quality(
                image, format_str, current_quality, optimize)
            current_size = len(compressed)

            # Если размер подходит, возвращаем
            if current_size <= target_size_bytes:
                return compressed

            # Запоминаем лучший результат
            size_diff = abs(current_size - target_size_bytes)
            if size_diff < best_size_diff:
                best_size_diff = size_diff
                best_result = compressed

            # Уменьшаем качество
            current_quality -= self.QUALITY_STEP

        # Если не удалось достичь целевого размера, возвращаем лучший результат
        return best_result if best_result is not None else compressed

    async def get_file_size(self, image_data: bytes | BytesIO) -> int:
        """
        Получить размер файла изображения в байтах.

        Args:
            image_data: Данные изображения

        Returns:
            Размер в байтах
        """
        def _get_size() -> int:
            if isinstance(image_data, bytes):
                return len(image_data)
            else:
                image_data.seek(0, 2)  # Перемещаемся в конец
                size = image_data.tell()
                image_data.seek(0)  # Возвращаемся в начало
                return size

        return await asyncio.to_thread(_get_size)

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
        def _optimize() -> bytes:
            # Открываем изображение
            if isinstance(image_data, bytes):
                image = Image.open(BytesIO(image_data))
            else:
                image_data.seek(0)
                image = Image.open(image_data)

            original_format = image.format or "PNG"
            output = BytesIO()

            # Базовые параметры сохранения
            save_kwargs = {"format": original_format}

            # Оптимизация для JPEG
            if original_format == "JPEG":
                save_kwargs["quality"] = 95  # Высокое качество (почти без потерь)
                save_kwargs["optimize"] = True  # Оптимизация таблиц Хаффмана
                if progressive:
                    save_kwargs["progressive"] = True  # Прогрессивное кодирование
                save_kwargs["subsampling"] = 0  # 4:4:4 (без субдискретизации цвета)

            # Оптимизация для PNG
            elif original_format == "PNG":
                save_kwargs["optimize"] = True
                save_kwargs["compress_level"] = 9  # Максимальное сжатие без потерь

            # Оптимизация для WEBP
            elif original_format == "WEBP":
                save_kwargs["lossless"] = True  # Режим без потерь
                save_kwargs["quality"] = 100
                save_kwargs["method"] = 6  # Самый медленный, но лучшее сжатие

            # Удаляем метаданные, если требуется
            if remove_metadata:
                # Создаем новое изображение без метаданных
                data = list(image.getdata())
                image_without_exif = Image.new(image.mode, image.size)
                image_without_exif.putdata(data)
                image_without_exif.save(output, **save_kwargs)
            else:
                image.save(output, **save_kwargs)

            output.seek(0)
            return output.getvalue()

        return await asyncio.to_thread(_optimize)
