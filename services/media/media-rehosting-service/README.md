# media-rehosting-service

> **Domain:** Media Pipeline  
> **Type:** Backend microservice  
> **Runtime:** Python 3.14 · FastAPI · APScheduler · MinIO

**media-rehosting-service** is the processor stage of the Media Rehosting Pipeline. It takes externally referenced image URLs from a job queue, downloads and validates each file, then uploads it to Monstrino-managed object storage — making media delivery stable, deduplicated, and fully under platform control.

---

## Table of Contents

- [media-rehosting-service](#media-rehosting-service)
  - [Table of Contents](#table-of-contents)
  - [Responsibilities](#responsibilities)
  - [Non-Goals](#non-goals)
  - [Pipeline Context](#pipeline-context)
  - [Architecture](#architecture)
  - [Processing Flow](#processing-flow)
  - [Processing States](#processing-states)
  - [Storage Strategy](#storage-strategy)
  - [Downloader](#downloader)
  - [Domain Models](#domain-models)
  - [API](#api)
  - [Configuration](#configuration)
    - [Database](#database)
    - [MinIO / Object Storage](#minio--object-storage)
    - [Downloader](#downloader-1)
  - [Local Development](#local-development)
    - [Prerequisites](#prerequisites)
    - [Install dependencies](#install-dependencies)
    - [Run locally](#run-locally)
    - [Run with test database](#run-with-test-database)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Build Docker image](#build-docker-image)
    - [Push to registry](#push-to-registry)
    - [Deploy](#deploy)
  - [Tech Stack](#tech-stack)

---

## Responsibilities

- Claim unprocessed `MediaIngestionJob` records from the database queue.
- Download external image files via streaming HTTP with SSRF protection.
- Inspect and validate downloaded image content (format, size, decodability).
- Compute SHA-256 hash for deduplication and content addressing.
- Upload validated files to MinIO object storage under a deterministic content-addressed key.
- Persist `MediaAsset` and `MediaAttachment` domain records.
- Transition job state through the full lifecycle: `init` → `processed` / `failed`.

---

## Non-Goals

This service explicitly does **not**:

- Subscribe to Kafka or create ingestion job records (handled by the subscriber stage).
- Expose user-facing media queries or search endpoints.
- Perform image transformation, normalization, or background removal.
- Manage authentication or authorization for end users.
- Guarantee real-time or near-real-time processing.

---

## Pipeline Context

The full **Media Rehosting Pipeline** consists of two stages:

```
┌─────────────────────────────┐     Kafka      ┌─────────────────────────────┐
│  media-rehosting-subscriber │  ─────────────▶ │  media-rehosting-service    │
│  (event intake)             │                 │  (this service — processor) │
└─────────────────────────────┘                 └─────────────────────────────┘
         Creates MediaIngestionJob                      Executes IngestExternalMediaUseCase
         with state = init                              Downloads → Validates → Stores
```

| Stage | Role |
|-------|------|
| `media-rehosting-subscriber` | Consumes Kafka events, writes `MediaIngestionJob` records |
| **`media-rehosting-service`** | Scheduler-driven processor — downloads, validates, uploads to MinIO |

---

## Architecture

The service follows **Clean Architecture** with strict, unidirectional layer dependencies:

```
presentation/        ← FastAPI routes, dependency injection
bootstrap/           ← DI container wiring
app/
  use_cases/         ← Orchestrates the full ingestion lifecycle
  ports/             ← Abstract interfaces for repos, downloader, S3
  services/          ← App-layer services (currently minimal)
infra/
  services/          ← Concrete adapters: AsyncImageDownloader, MinioStorage
  logging/           ← Structured logging configuration
```

The `IngestExternalMediaUseCase` is the sole orchestrator — it owns the entire flow from job claim to terminal state.

---

## Processing Flow

Each scheduler tick invokes `IngestExternalMediaUseCase.execute()`, which processes **one job per invocation**:

```
MediaIngestionJob (state = init)
        │
        ▼ claim_unprocessed_rehost_job()   ← atomic select-for-update
        │
        ▼ downloader.download(source_url)
        │   ├─ streaming GET via httpx
        │   ├─ SSRF protection (private IP block)
        │   ├─ size limit enforcement (≤ 15 MB)
        │   ├─ SHA-256 streaming hash
        │   └─ PIL image inspection (format, width, height, ext)
        │
        ▼ Deduplication check
        │   ├─ SHA-256 already in media_ingestion_job?  → skip (link to existing)
        │   └─ SHA-256 already in media_asset?          → skip (reuse)
        │
        ▼ s3_storage.put(bucket, key, content, content_type)
        │   └─ storage_key = assets/image/sha256/{h[0:2]}/{h[2:4]}/{sha256}.{ext}
        │
        ▼ Persist MediaAsset
        │   (provider, bucket, key, hash, dimensions, content_type, byte_size…)
        │
        ▼ Persist MediaAttachment
        │   (links asset ↔ source entity)
        │
        ▼ job.state = processed
```

> **On any exception:** the job remains in `processing` state and will be eligible for retry or manual inspection. No partial state is emitted to canonical tables.

---

## Processing States

| State | Meaning |
|-------|---------|
| `init` | Job created by subscriber, not yet claimed |
| `processing` | Currently being handled — prevents duplicate execution |
| `processed` | File downloaded, validated, uploaded, asset persisted |
| `failed` | Terminal failure — not retried automatically |
| `retry_pending` | Transient failure — will be retried on next run |
| `invalid_media` | File failed validation — not retryable |

---

## Storage Strategy

Files are stored in MinIO using a **content-addressed** path scheme based on the SHA-256 hash of the file content:

```
assets/image/sha256/{first_two}/{next_two}/{sha256_hex}.{ext}
```

**Example:**

```
assets/image/sha256/3a/f1/3af1c2d8e...b7.jpg
```

This layout provides:

- **Automatic deduplication** — identical files map to the same key.
- **Efficient sharding** — two-level prefix prevents hot-spot directories.
- **Content integrity** — the path itself encodes the hash.

Public assets are served from `https://media.monstrino.com`.

---

## Downloader

`AsyncImageDownloader` (`infra/services/downloader.py`) handles all file acquisition:

| Feature | Details |
|---------|---------|
| HTTP client | `httpx.AsyncClient` with streaming |
| Redirects | Followed automatically (max 5) |
| Request timeout | 15 seconds |
| Max file size | 15 MB |
| SSRF protection | Private/loopback IP ranges blocked |
| Hash | SHA-256 computed during streaming (single pass) |
| Image inspection | PIL — validates format, extracts width, height, extension |
| Content-type | Derived from PIL format; falls back to `Content-Type` header |
| User-Agent | Realistic browser UA to avoid bot rejection |

**Returned `DownloadedFile` fields:**

| Field | Type | Description |
|-------|------|-------------|
| `content` | `bytes` | Raw file bytes |
| `sha256_hex` | `str` | Full SHA-256 hex digest |
| `content_type` | `str` | Detected MIME type |
| `byte_size` | `int` | File size in bytes |
| `width` | `int` | Image width in pixels |
| `height` | `int` | Image height in pixels |
| `ext` | `str` | Normalized file extension |
| `original_filename` | `str \| None` | Filename from URL path, if present |

---

## Domain Models

| Model | Description |
|-------|-------------|
| `MediaIngestionJob` | Job tracking record; carries `source_url`, `related_entity_*`, `correlation_id`, `media_kind`, and processing state |
| `MediaAsset` | Persisted representation of a stored file — provider, bucket, key, hash, dimensions, MIME type, byte size |
| `MediaAttachment` | Link between a `MediaAsset` and a domain entity (e.g., release, character) |

---

## API

The service exposes **internal-only routes** under `/api/v1/internal` (JWT-protected).

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/internal/__debug__/raise-api-error` | Forces a test `ApiError` (HTTP 418) — debug only |

> The job trigger endpoint (`POST /jobs/{job_id}/resume`) is planned but not yet active. Jobs are currently driven entirely by the scheduler.

---

## Configuration

Copy the example env file and fill in your values:

```bash
cp .env.db_local.example .env.db_local
```

### Database

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_NAME` | Database name | `postgres` |
| `DB_MODE` | Mode selector (`local` / `test`) | `local` |

### MinIO / Object Storage

| Variable | Description |
|----------|-------------|
| `MODE` | Runtime mode: `development` or `production` |
| `MINIO_ENDPOINT` | MinIO host (e.g. `localhost:9000`) |
| `MINIO_ACCESS_KEY` | MinIO access key |
| `MINIO_SECRET_KEY` | MinIO secret key |

### Downloader

| Variable | Description |
|----------|-------------|
| `MHARCHIVE_COOKIE` | `cf_clearance` cookie value for source sites behind Cloudflare |

---

## Local Development

### Prerequisites

- Python 3.13+
- [`uv`](https://github.com/astral-sh/uv) package manager
- PostgreSQL instance (local or Docker)
- MinIO instance (local or Docker)
- SSH access to the private `monstrino-*` GitHub packages

### Install dependencies

```bash
uv sync
```

### Run locally

```bash
make run
```

Sets `DB_MODE=local` and starts Uvicorn on **port 8008** with hot-reload enabled.

### Run with test database

```bash
make run-with-test-bd
```

---

## Testing

```
tests/
  unit/         ← Pure logic, framework-free
  integration/  ← Service + repository interactions
  e2e/          ← Full flow against real DB and MinIO
  fixtures/     ← Shared test data and factories
  mocks/        ← Mock implementations of ports
```

Run all tests:

```bash
make pytest
```

Run with full log output:

```bash
make pytest-with-logs
```

---

## Deployment

The service is containerized and deployed to Kubernetes.

### Build Docker image

```bash
make build
```

Multi-stage build: `uv`-based dependency resolution → minimal `python:3.13-slim` runtime. Runs as a non-root user (`appuser`, UID 10001) on port **8000**.

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
| HTTP client | httpx (async streaming) |
| Image processing | Pillow |
| Object storage | MinIO (`minio` SDK) |
| Database | PostgreSQL (asyncpg · psycopg3 · SQLAlchemy 2) |
| Migrations | Alembic |
| Validation | Pydantic v2 |
| Package manager | uv |
| Container | Docker (multi-stage build) |
| Orchestration | Kubernetes |
| Auth | JWT (`pyjwt`) |
| Testing | pytest · pytest-asyncio · pytest-mock |
| Internal packages | `monstrino-core` · `monstrino-models` · `monstrino-repositories` · `monstrino-api` · `monstrino-contracts` |
