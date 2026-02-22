-- Проверка индексов на таблице source
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'source' AND schemaname = 'ingest';

-- Проверка статистики по таблице source
SELECT 
    n_live_tup as "Live Rows",
    n_dead_tup as "Dead Rows",
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
WHERE schemaname = 'ingest' AND relname = 'source';

-- EXPLAIN ANALYZE для проблемного запроса (замените UUID на реальный)
EXPLAIN ANALYZE
SELECT 
    ingest.source.id, 
    ingest.source.code, 
    ingest.source.title, 
    ingest.source.source_type_id, 
    ingest.source.base_url, 
    ingest.source.description, 
    ingest.source.last_parsed_at, 
    ingest.source.is_enabled, 
    ingest.source.updated_at, 
    ingest.source.created_at, 
    source_type_1.id AS id_1, 
    source_type_1.code AS code_1, 
    source_type_1.title AS title_1, 
    source_type_1.description AS description_1, 
    source_type_1.requires_auth, 
    source_type_1.is_active, 
    source_type_1.updated_at AS updated_at_1, 
    source_type_1.created_at AS created_at_1 
FROM ingest.source 
LEFT OUTER JOIN ingest.source_type AS source_type_1 
    ON source_type_1.id = ingest.source.source_type_id 
WHERE ingest.source.id = '00000000-0000-0000-0000-000000000000'::uuid  -- ЗАМЕНИТЕ НА РЕАЛЬНЫЙ UUID
LIMIT 1;

-- Проверка блокировок
SELECT 
    pid,
    usename,
    state,
    query,
    wait_event_type,
    wait_event,
    query_start,
    state_change
FROM pg_stat_activity
WHERE state != 'idle'
  AND query NOT LIKE '%pg_stat_activity%'
ORDER BY query_start;

-- Проверка размера таблиц
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
    pg_total_relation_size(schemaname||'.'||tablename) AS size_bytes
FROM pg_tables
WHERE schemaname = 'ingest'
ORDER BY size_bytes DESC;
