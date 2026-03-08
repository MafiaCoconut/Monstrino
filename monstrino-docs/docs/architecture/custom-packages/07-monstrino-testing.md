---
title: monstrino-testing
description: Shared pytest plugin — deterministic UUID fixtures, async DB schema setup, repository helpers, and pre-built test data factories.
sidebar_label: monstrino-testing
sidebar_position: 7
---

# monstrino-testing

## Purpose

`monstrino-testing` provides **shared testing infrastructure** for all Monstrino services.

It is a pytest plugin package that exports reusable fixtures, data builders, database setup helpers, and mock utilities — eliminating duplicated test scaffolding across service test suites.

## Dependencies

| Package |
|---------|
| `pytest` |
| `pytest-asyncio` |
| `monstrino-core` |
| `monstrino-models` |
| `monstrino-repositories` |

## Actual Structure

```text
monstrino_testing/
├── plugin.py                  # Central pytest plugin — re-exports all fixtures via `from monstrino_testing.fixtures import *`
└── fixtures/
    ├── api/
    │   └── llm_gateway.py     # LlmGateway mock fixture
    ├── base/
    ├── data/                  # Pytest fixtures returning populated DTO objects
    │   ├── auth/              # auth_user, refresh_token
    │   ├── catalog/
    │   ├── core/              # geo_country, money_currency, source, source_type, …
    │   ├── ingest/            # parsed_character, parsed_pet, parsed_release, parsed_series
    │   ├── market/            # market_product_price_observation, release_market_link, release_msrp, …
    │   └── media/             # media_asset, media_asset_variant, media_attachment, media_ingestion_job
    └── db/
        ├── db_metadata.py          # Repositories dataclass + build_repositories() factory
        ├── repositories_fixture.py # `engine` and `session_factory` pytest fixtures; creates DB schema via SQLAlchemy metadata
        └── unit_of_work_fixture.py # `unit_of_work` fixture wrapping SqlAlchemyUnitOfWork
```

## Key Concepts

### pytest Plugin

`plugin.py` registers all fixtures globally via a single
`from monstrino_testing.fixtures import *`. Any service that adds
`monstrino-testing` as a dev dependency automatically inherits
all fixtures without manual conftest imports.

### Deterministic ID Generation

`fixture_uuid(key: str)` returns a stable `uuid.uuid7()` per named key,
cached in a module-level dict. This ensures that related fixtures reference the
same entity IDs across different fixture files.

```python
RELEASE_DRACULAURA_ID = fixture_uuid("release_draculaura")
```

### Database Fixtures
The `db/` fixtures spin up a real async PostgreSQL connection for integration tests:

```python
@pytest.fixture(scope="function")
async def engine():
    eng = create_async_engine(DATABASE_URL)
    async with eng.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # creates all tables
    yield eng
    await eng.dispose()
```

`DATABASE_URL` defaults to `postgresql+asyncpg://pytest:pytest@localhost:5432/monstrino` but can be overridden via the `DATABASE_URL` env variable.

### Repositories Fixture
`build_repositories(session)` instantiates the full `Repositories` dataclass, wiring every concrete `SqlAlchemy*Repo` implementation to a shared async session — spanning auth, catalog, core, ingest, market, and media domains.

### Data Fixtures
Each data fixture returns a pre-populated Pydantic DTO, e.g.:

```python
@pytest.fixture
def release() -> Release:
    return Release(id=RELEASE_DRACULAURA_GHOULS_RULE_ID, slug="Draculaura Ghouls Rule", ...)
```

These fixtures can be composed and injected directly into test functions without any HTTP or DB interaction.

## Benefits

-   **Zero boilerplate** — one package import gives access to all reusable fixtures
-   **Consistent test data** — shared IDs and entity builders across all services
-   **Real DB integration** — `engine`/`unit_of_work` fixtures support true integration tests
-   **Isolated data fixtures** — DTO-only fixtures work without any DB connection