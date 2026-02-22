#!/usr/bin/env python3
"""
Быстрый тест для проверки времени выполнения get_one_by
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "src"))
from dotenv import load_dotenv

load_dotenv()

from monstrino_models.dto import Source
from bootstrap.builders.uow_factory import build_uow_factory
import asyncio
from datetime import datetime


async def test_get_one_by():
    uow_factory = build_uow_factory()

    print("=" * 80)
    print("🧪 ТЕСТ: get_one_by для Source")
    print("=" * 80)

    # Получаем список всех source
    async with uow_factory.create() as uow:
        print("\n1. Получение всех source...")
        start = datetime.now()
        all_sources = await uow.repos.source.get_all()
        elapsed = (datetime.now() - start).total_seconds()
        print(f"   Время: {elapsed:.4f} сек")
        print(f"   Найдено: {len(all_sources)} источников")

        if not all_sources:
            print("   ❌ Нет источников в БД!")
            return

        first_source = all_sources[0]
        print(
            f"   Первый source: id={first_source.id}, title={first_source.title}")

    # Тест get_one_by с id (проблемный запрос)
    async with uow_factory.create() as uow:
        print(f"\n2. Тест get_one_by(id={first_source.id})...")
        start = datetime.now()
        source = await uow.repos.source.get_one_by(id=first_source.id)
        elapsed = (datetime.now() - start).total_seconds()

        print(f"   Время: {elapsed:.4f} сек")

        if elapsed > 1.0:
            print(f"   ❌ МЕДЛЕННО! ({elapsed:.2f} сек)")
        elif elapsed > 0.1:
            print(f"   ⚠️  Медленнее ожидаемого ({elapsed:.3f} сек)")
        else:
            print(f"   ✅ БЫСТРО!")

        if source:
            print(f"   Source найден: {source.title}")
        else:
            print(f"   ❌ Source НЕ найден!")

    # Множественный тест (как в реальном use case)
    print(f"\n3. Тест 5 последовательных get_one_by...")
    times = []

    for i in range(5):
        async with uow_factory.create() as uow:
            start = datetime.now()
            source = await uow.repos.source.get_one_by(id=first_source.id)
            elapsed = (datetime.now() - start).total_seconds()
            times.append(elapsed)
            print(f"   Запрос {i+1}: {elapsed:.4f} сек")

    avg_time = sum(times) / len(times)
    max_time = max(times)
    min_time = min(times)

    print(f"\n   Среднее: {avg_time:.4f} сек")
    print(f"   Минимум: {min_time:.4f} сек")
    print(f"   Максимум: {max_time:.4f} сек")

    if max_time > 1.0:
        print(f"   ❌ ПРОБЛЕМА СОХРАНЯЕТСЯ!")
    else:
        print(f"   ✅ Проблема решена!")

    print("\n" + "=" * 80)


if __name__ == "__main__":
    asyncio.run(test_get_one_by())
