# catalog-importer

> **Domain:** Acquisition · Data Ingestion  
> **Type:** Backend microservice  
> **Runtime:** Python 3.13 · FastAPI · APScheduler

**catalog-importer** is the sole authorized gateway through which externally collected data enters the canonical domain tables of the Monstrino platform. It consumes records produced by **catalog-collector** from parsed staging tables, validates and transforms them into fully resolved domain entities, and persists the results transactionally.

---

## Table of Contents

- [Responsibilities](#responsibilities)
- [Non-Goals](#non-goals)
- [Architecture](#architecture)
- [Processing Model](#processing-model)
- [Data Flow](#data-flow)
- [Domain Types & Internal Services](#domain-types--internal-services)
- [API](#api)
- [Configuration](#configuration)
- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)

---

## Responsibilities

- Transform validated parsed records into canonical domain entities.
- Enforce domain invariants before any data reaches production tables.
- Guarantee that **invalid or partial records never pollute canonical tables**.
- Mark each parsed record as `processed` or `with_errors` after an attempt.
- Accept on-demand job triggers via the internal API for immediate reprocessing.

---

## Non-Goals

This service explicitly does **not**:

- Fetch or scrape data from external sources (handled by **catalog-collector**).
- Expose any user-facing API.
- Provide real-time or near-real-time processing guarantees.
- Handle authentication / authorization concerns for end users.
- Perform any UI-related logic.

---

## Architecture

The service follows **Clean Architecture**, with strict unidirectional dependencies between layers:

```
presentation/        ← FastAPI routes, dependency injection
bootstrap/           ← DI container wiring, scheduler configuration
app/
  use_cases/         ← Orchestrates domain services per record
  services/          ← Resolver services (character, series, type, image…)
  ports/             ← Repository port interfaces
  interfaces/        ← External gateway interfaces (LLM…)
domain/              ← Entities, enums, value objects (no framework deps)
infra/               ← Adapters, DB config, LLM tasks, logging
```

Each use case owns the full lifecycle of a single record — from fetching the parsed entity to persisting the domain result and marking the record as processed.

---

## Processing Model

### Scheduled Execution

Four independent cron jobs run automatically every day:

| Job | Entity | Schedule (UTC) |
|-----|--------|----------------|
| `PROCESS_CHARACTER` | Characters | 02:10 |
| `PROCESS_PET`       | Pets       | 02:20 |
| `PROCESS_SERIES`    | Series     | 02:30 |
| `PROCESS_RELEASE`   | Releases   | 02:40 |

Each job is independent — a failure in one does not block the others.

### Batch & Concurrency

- Unprocessed records are selected in **batches of 10**.
- Batches are processed **asynchronously in parallel**.
- Each record is handled by a dedicated single-record use case.
- A failure in one record leaves all other records in the batch unaffected.

### Manual Triggering

Any job can be triggered on-demand via the internal API without waiting for the next scheduled run (see [API](#api)).

---

## Data Flow

```
parsed_* tables  (produced by catalog-collector)
        │
        ▼
Batch Selection — unprocessed records only
        │
        ▼
Async Parallel Batch (size = 10)
        │
        ▼
Single-Record Use Case
        │
        ├─► Domain Services (type resolution, naming, images, relations…)
        │
        ▼
Canonical Domain Tables
        │
        ▼
parsed_* record → marked as `processed`  (or `with_errors` on failure)
```

---

## Domain Types & Internal Services

### Characters

Per-record use case: `ProcessCharacterSingleUseCase`

| Service | Responsibility |
|---------|---------------|
| `GenderResolverService` | Resolves and assigns character gender |
| `ImageReferenceService` | Queues primary image for downstream processing |

### Pets

Per-record use case: `ProcessPetSingleUseCase`

| Service | Responsibility |
|---------|---------------|
| `OwnerResolverService` | Resolves the owning character for a pet |
| `ImageReferenceService` | Queues primary image for downstream processing |

### Series

Per-record use case: `ProcessSeriesSingleUseCase`

| Service | Responsibility |
|---------|---------------|
| `ParentResolverService` | Resolves parent–child series relationships |

### Releases

Per-record use case: `ProcessReleaseSingleUseCase`  
The most complex pipeline — a parsed release is resolved across multiple dimensions:

| Service | Responsibility |
|---------|---------------|
| `CharacterResolverService` | Links release to one or more characters (with roles) |
| `SeriesResolverService` | Links release to its series |
| `ExclusiveResolverService` | Resolves retailer exclusivity |
| `PetResolverService` | Links bundled pets to the release |
| `ReissueRelationResolverService` | Detects and links reissue relationships |
| `ContentTypeResolverService` | Classifies content type |
| `PackTypeResolverService` | Classifies pack type |
| `TierTypeResolverService` | Classifies tier type |
| `ImageProcessingService` | Processes release image assets |
| `ExternalRefResolverService` | Attaches external source references |

---

## API

The service exposes **internal-only routes** under `/api/v1/internal` (JWT-protected).

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/internal/jobs/{job_id}/resume` | Manually trigger a processing job by its cron ID |
| `GET`  | `/api/v1/internal/__debug__/raise-api-error` | Debug endpoint — forces a test API error (418) |

**Job IDs** correspond to the `ProcessCronJobIDs` enum:

- `PROCESS_CHARACTER`
- `PROCESS_PET`
- `PROCESS_SERIES`
- `PROCESS_RELEASE`

---

## Configuration

Copy the example env file and adjust values:

```bash
cp .env.db_local.example .env.db_local
```

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_NAME` | Database name | `postgres` |
| `DB_MODE` | Database mode (`local` / `test`) | `local` |

---

## Local Development

### Prerequisites

- Python 3.13+
- [`uv`](https://github.com/astral-sh/uv) package manager
- PostgreSQL instance (local or via Docker)
- SSH access to the private `monstrino-*` GitHub packages

### Install dependencies

```bash
uv sync
```

### Run locally

```bash
make run
```

Sets `DB_MODE=local` and starts Uvicorn on **port 8009** with hot-reload enabled.

### Run with test database

```bash
make run-with-test-db
```

---

## Testing

Tests live in `tests/` and are organized into four suites:

```
tests/
  unit/         ← Pure logic, no I/O
  integration/  ← Service + repository interactions
  e2e/          ← Full flow against a real database
  fixtures/     ← Shared test data and factories
  mocks/        ← Mock implementations
```

Run the full test suite:

```bash
make pytest
```

Run with full log output:

```bash
make pytest-with-logs
```

The suite uses `pytest-asyncio` with `asyncio_mode = auto`.

---

## Deployment

The service is containerized and deployed to Kubernetes.

### Build Docker image

```bash
make build
```

Multi-stage build: `uv`-based dependency installation → minimal `python:3.13-slim` runtime. Runs as a non-root user (`appuser`, UID 10001) on port **8000**.

### Push to registry

```bash
make push-service
```

Images are tagged with the short Git SHA:  
`registry.monstrino.com/monstrino/monstrino-catalog-importer:<sha>`

### Deploy

```bash
# Test environment
make deploy-catalog-importer-test

# Production environment
make deploy-catalog-importer-prod
```

| Environment | Kubernetes Namespace |
|-------------|----------------------|
| Test | `monstrino-test` |
| Production | `monstrino-prod` |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Language | Python 3.13 |
| Web framework | FastAPI + Uvicorn |
| Scheduler | APScheduler 3.x |
| Database | PostgreSQL (asyncpg · psycopg3 · SQLAlchemy 2) |
| Migrations | Alembic |
| Validation | Pydantic v2 |
| Package manager | uv |
| Container | Docker (multi-stage build) |
| Orchestration | Kubernetes |
| Auth | JWT (`pyjwt`) |
| Testing | pytest · pytest-asyncio · pytest-mock |
| Internal packages | `monstrino-core` · `monstrino-models` · `monstrino-repositories` · `monstrino-api` · `monstrino-infra` · `monstrino-contracts` · `monstrino-testing` |
