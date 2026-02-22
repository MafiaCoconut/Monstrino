#!/usr/bin/env python3
"""
Скрипт для диагностики проблем с производительностью БД.
Запуск: python3 debug_db_check.py
"""
from sqlalchemy import text
import asyncio
import sys
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
# Добавляем src в путь
sys.path.insert(0, str(Path(__file__).parent / "src"))
load_dotenv(dotenv_path=Path(__file__).parent / ".env")
print(Path(__file__).parent / ".env")
from monstrino_infra.configs import async_engine

async def check_db_performance():
    """Проверка производительности запросов к БД."""

    async with async_engine.begin() as conn:
        print("=" * 80)
        print("🔍 ПРОВЕРКА ПРОИЗВОДИТЕЛЬНОСТИ БАЗЫ ДАННЫХ")
        print("=" * 80)

        # 1. Проверка версии PostgreSQL
        print("\n1️⃣ Версия PostgreSQL:")
        result = await conn.execute(text("SELECT version();"))
        version = result.scalar()
        print(f"   {version}")

        # 2. Проверка текущих настроек пула
        print("\n2️⃣ Настройки пула соединений:")
        print(f"   Pool size: {async_engine.pool.size()}")
        print(f"   Pool timeout: {async_engine.pool.timeout()}")
        print(f"   Checked out connections: {async_engine.pool.checkedout()}")
        print(f"   Overflow: {async_engine.pool.overflow()}")

        # 3. Проверка индексов на таблице source
        print("\n3️⃣ Индексы на таблице ingest.source:")
        result = await conn.execute(text("""
            SELECT indexname, indexdef 
            FROM pg_indexes 
            WHERE tablename = 'source' AND schemaname = 'ingest'
            ORDER BY indexname;
        """))
        indexes = result.fetchall()
        if indexes:
            for idx in indexes:
                print(f"   - {idx[0]}")
                print(f"     {idx[1]}")
        else:
            print("   ❌ НЕТ ИНДЕКСОВ!")

        # 4. Проверка статистики таблицы
        print("\n4️⃣ Статистика таблицы ingest.source:")
        result = await conn.execute(text("""
            SELECT 
                n_live_tup as live_rows,
                n_dead_tup as dead_rows,
                last_vacuum,
                last_autovacuum,
                last_analyze,
                last_autoanalyze
            FROM pg_stat_user_tables
            WHERE schemaname = 'ingest' AND relname = 'source';
        """))
        stats = result.fetchone()
        if stats:
            print(f"   Live rows: {stats[0]}")
            print(f"   Dead rows: {stats[1]}")
            print(f"   Last vacuum: {stats[2]}")
            print(f"   Last autovacuum: {stats[3]}")
            print(f"   Last analyze: {stats[4]}")
            print(f"   Last autoanalyze: {stats[5]}")

            if stats[1] > stats[0] * 0.1:  # Более 10% мертвых строк
                print("   ⚠️  ВНИМАНИЕ: Много мертвых строк! Запустите VACUUM ANALYZE")

        # 5. Тестовый запрос на source
        print("\n5️⃣ Тест запроса к ingest.source:")
        start = datetime.now()
        result = await conn.execute(text("""
            SELECT id FROM ingest.source LIMIT 1;
        """))
        source_id = result.scalar()
        elapsed = (datetime.now() - start).total_seconds()
        print(f"   Время выполнения: {elapsed:.4f} сек")

        if source_id and elapsed < 1.0:
            # 6. Тест проблемного запроса с JOIN
            print("\n6️⃣ Тест запроса с LEFT JOIN на source_type:")
            start = datetime.now()
            result = await conn.execute(text(f"""
                SELECT 
                    s.id, s.code, s.title, 
                    st.id as st_id, st.code as st_code, st.title as st_title
                FROM ingest.source s
                LEFT OUTER JOIN ingest.source_type st ON st.id = s.source_type_id
                WHERE s.id = :source_id
                LIMIT 1;
            """), {"source_id": source_id})
            row = result.fetchone()
            elapsed = (datetime.now() - start).total_seconds()
            print(f"   Время выполнения: {elapsed:.4f} сек")

            if elapsed > 1.0:
                print(f"   ❌ МЕДЛЕННЫЙ ЗАПРОС! ({elapsed:.2f} сек)")

                # Получить EXPLAIN ANALYZE
                print("\n   📊 EXPLAIN ANALYZE:")
                result = await conn.execute(text(f"""
                    EXPLAIN ANALYZE
                    SELECT 
                        s.id, s.code, s.title, 
                        st.id as st_id, st.code as st_code, st.title as st_title
                    FROM ingest.source s
                    LEFT OUTER JOIN ingest.source_type st ON st.id = s.source_type_id
                    WHERE s.id = :source_id
                    LIMIT 1;
                """), {"source_id": source_id})
                for line in result.fetchall():
                    print(f"   {line[0]}")
            else:
                print(f"   ✅ Запрос выполнился быстро")

        # 7. Проверка активных соединений
        print("\n7️⃣ Активные соединения к БД:")
        result = await conn.execute(text("""
            SELECT 
                count(*) as total,
                count(*) FILTER (WHERE state = 'active') as active,
                count(*) FILTER (WHERE state = 'idle') as idle
            FROM pg_stat_activity
            WHERE datname = current_database();
        """))
        connections = result.fetchone()
        print(
            f"   Всего: {connections[0]}, Активных: {connections[1]}, Idle: {connections[2]}")

        print("\n" + "=" * 80)
        print("✅ Диагностика завершена")
        print("=" * 80)


if __name__ == "__main__":
    asyncio.run(check_db_performance())
