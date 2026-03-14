---
title: monstrino-infra
description: Concrete infrastructure adapters - HTTP/2 client with circuit breaker, database settings, APScheduler adapter, and web scrapers.
sidebar_label: monstrino-infra
sidebar_position: 6
---

# monstrino-infra

## Purpose

`monstrino-infra` provides **concrete technical infrastructure components** used across Monstrino services.

It implements the infrastructure adapters, HTTP clients, DB configuration, schedulers, third-party collectors (scrapers), and AI gateway integrations that satisfy ports defined in `monstrino-core` and `monstrino-api`.

## Dependencies

| Package |
|---------|
| `httpx[http2]` |
| `aiobreaker` |
| `fastapi` |
| `aiohttp[speedups]` |
| `apscheduler` |
| `pydantic-settings` |
| `dotenv` |
| `lxml` |
| `bs4` |
| `tabulate` |
| `monstrino-core` |
| `monstrino-api` |

## Actual Structure

```text
monstrino_infra/
├── adapters/
├── api_clients/
│   ├── catalog-api-client
│   ├── source-1
│   └── source-n
├── auth/
├── collectors/
│   ├── source-1
│   ├── source-2
│   └── source-n
├── configs/
├── debug/
├── gateways/
├── http/
└── services/
```

## Key Concepts

### HttpClient

Full-featured async HTTP client built on `httpx`:

- **HTTP/2** support out of the box
- **Circuit Breaker** via `aiobreaker` (configurable fail threshold + reset timeout)
- **Concurrency limit** via `asyncio.Semaphore(10)`
- **Retry logic** with exponential backoff
- **Pydantic response validation** - returns typed objects directly

```python
client = HttpClient(timeout=20.0, breaker_fail_threshold=5)
result: MyModel = await client.get(url, response_model=MyModel)
```

### DBSettings

`pydantic-settings`-based configuration loaded from environment variables or `.env` files. Supports `DB_MODE` (`local` / `test` / `prod`) for automatic `.env` file selection. Provides `sqlalchemy_url_asyncpg`, `sqlalchemy_url_psycopg`, and `engine_kwargs()` for connection pool configuration.

```python
db_settings = get_db_settings()      # cached singleton
async_engine = create_async_engine(**db_settings.engine_kwargs())
```

### SchedulerAdapter

Wraps `APScheduler`'s `AsyncIOScheduler` to implement
the `SchedulerPort` protocol from `monstrino-core`.
Supports `add_job`, `remove_job`, `resume_job`, `trigger_job`
(forces immediate execution).

## Must NOT Contain

- domain rules or business logic
- SQLAlchemy ORM model definitions
- API request/response schemas

This layer isolates all **technical and external dependencies** from the domain.
