# media-normalization

> **Domain:** Media Pipeline  
> **Type:** Backend microservice  
> **Runtime:** Python 3.13 · FastAPI · APScheduler · Pillow  
> **Previously known as:** `media-normalizator`

**media-normalization** is the transformation stage of the Media Pipeline. It takes raw image assets that have already been downloaded and stored by **media-rehosting-service**, and applies a configurable chain of operations: resize → format conversion → compression. The result is an optimized, platform-standard image asset ready for delivery.

---

## Table of Contents

- [media-normalization](#media-normalization)
  - [Table of Contents](#table-of-contents)
  - [Responsibilities](#responsibilities)
  - [Non-Goals](#non-goals)
  - [Pipeline Context](#pipeline-context)
  - [Architecture](#architecture)
  - [Image Processing Pipeline](#image-processing-pipeline)
  - [Adapters](#adapters)
    - [`ImageResizer`](#imageresizer)
    - [`ImageFormatConverter`](#imageformatconverter)
    - [`ImageCompressor`](#imagecompressor)
    - [`AspectRatioManager`](#aspectratiomanager)
    - [`ImageWatermarker`](#imagewatermarker)
    - [`ImageProcessingPipeline` _(orchestrator)_](#imageprocessingpipeline-orchestrator)
  - [Processing Strategies](#processing-strategies)
  - [API](#api)
  - [Configuration](#configuration)
    - [Database](#database)
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

- Receive `MediaAsset` records produced by **media-rehosting-service**.
- Apply the full image normalization chain: resize → format conversion → compression.
- Convert source images to WebP for optimal delivery.
- Generate resized variants and thumbnails.
- Apply aspect-ratio corrections and content-aware cropping.
- Optionally watermark images for brand attribution.
- Persist normalized variants back as `MediaAsset` records referencing the originals.

---

## Non-Goals

This service explicitly does **not**:

- Download or store raw images from external URLs (handled by **media-rehosting-service**).
- Subscribe to Kafka events or create ingestion job records.
- Perform AI-based image enhancement, background removal, or upscaling.
- Expose user-facing search or query endpoints.
- Manage authentication or authorization for end users.

---

## Pipeline Context

The full **Media Pipeline** for Monstrino consists of three stages:

```
External URL
     │
     ▼
┌──────────────────────────┐
│ media-rehosting-service  │  ← Download · Validate · Store raw asset in MinIO
└──────────────────────────┘
     │  MediaAsset (state = stored)
     ▼
┌──────────────────────────┐
│  media-normalization     │  ← THIS SERVICE
│  (this service)          │     Resize → Convert → Compress → Store variant
└──────────────────────────┘
     │  MediaAsset (normalized variant)
     ▼
Catalog delivery
```

| Stage | Role |
|-------|------|
| `media-rehosting-service` | Downloads external images; produces raw `MediaAsset` records |
| **`media-normalization`** | Transforms raw assets into optimized, platform-ready variants |

---

## Architecture

The service follows **Clean Architecture** with strict, unidirectional layer dependencies:

```
presentation/        ← FastAPI routes, dependency injection
bootstrap/           ← DI container wiring, scheduler configuration
app/
  use_cases/         ← ProcessNewImageUseCase — orchestrates the full pipeline
  ports/             ← Abstract interfaces for each image operation
infra/
  adapters/          ← Pillow-based implementations of all ports
  logging/           ← Structured logging configuration
```

Each image operation is defined as a port in `app/ports/` and implemented as an independent adapter in `infra/adapters/`, making each component independently testable and replaceable.

---

## Image Processing Pipeline

All operations follow a strictly ordered chain documented in [OPTIMIZATION_GUIDE.md](OPTIMIZATION_GUIDE.md):

```
RAW IMAGE (MediaAsset from media-rehosting-service)
        │
        ▼ Step 1: RESIZE (if needed)
        │   Reduce data volume before further operations
        │   → significantly speeds up subsequent steps
        │
        ▼ Step 2: FORMAT CONVERSION
        │   Convert to target format (default: WebP)
        │   → quality applied at this step
        │
        ▼ Step 3: COMPRESSION / OPTIMIZATION
        │   Lossless metadata stripping or iterative size targeting
        │
        ▼ NORMALIZED VARIANT (stored in MinIO, new MediaAsset record)
```

> **Why this order matters:**  
> Resizing first means all subsequent operations work on less data.  
> Compressing after conversion avoids re-encoding artifacts.  
> Always compress last to preserve the gains from earlier steps.

---

## Adapters

All image operations are implemented as fully async adapters backed by **Pillow**, using `asyncio.to_thread` to avoid blocking the event loop.

### `ImageResizer`

Resize images while preserving quality using **LANCZOS** resampling.

| Mode | Behaviour |
|------|-----------|
| `FIT` | Fits within target dimensions, preserves aspect ratio (thumbnail-safe) |
| `FILL` | Fills exact dimensions, crops excess from center |
| `STRETCH` | Stretches to exact dimensions without cropping |
| `THUMBNAIL` | Creates a thumbnail variant |

### `ImageFormatConverter`

Converts between image formats. Handles RGBA → RGB transparently when targeting JPEG (white background fill).

| Supported Formats |
|-------------------|
| `JPEG` |
| `PNG` |
| `WebP` |
| `BMP` |
| `GIF` |
| `TIFF` |

Default quality for lossy formats: **85**.

### `ImageCompressor`

Two compression modes:

| Mode | Description |
|------|-------------|
| Fixed quality | Compress to a specified quality value (1–100) |
| Target size | Iteratively reduce quality from 95 → 20 (step 5) until the file fits within a `target_size_kb` budget |

For PNG: lossless `compress_level=9` optimization.  
For JPEG/WebP: quality-based lossy compression with `optimize=True`.

### `AspectRatioManager`

Crop images to a target aspect ratio with configurable alignment:

| Alignment | Description |
|-----------|-------------|
| `center` _(default)_ | Crop symmetrically from both edges |
| `top` / `bottom` | Anchor vertically |
| `left` / `right` | Anchor horizontally |

### `ImageWatermarker`

Overlays a watermark — either an image or a text string — at any of 9 positions:

| Positions |
|-----------|
| `TOP_LEFT` · `TOP_CENTER` · `TOP_RIGHT` |
| `CENTER_LEFT` · `CENTER` · `CENTER_RIGHT` |
| `BOTTOM_LEFT` · `BOTTOM_CENTER` · `BOTTOM_RIGHT` _(default)_ |

Configurable opacity (0.0–1.0) and scale (relative to base image size).

### `ImageProcessingPipeline` _(orchestrator)_

High-level API that composes the adapters above in the correct order.

| Method | Description |
|--------|-------------|
| `jpeg_to_webp_optimal(data, strategy, width, height)` | Converts JPEG → WebP with resize pre-step |
| `optimize_existing_image(data, lossless)` | Optimizes an image in its current format |
| `full_optimization_pipeline(data, format, max_w, max_h, strategy, target_kb)` | Full resize → convert → compress chain |
| `batch_optimize(images, **kwargs)` | Parallel batch processing via `asyncio.gather` |

---

## Processing Strategies

The `full_optimization_pipeline` and `jpeg_to_webp_optimal` methods accept a `quality_strategy` parameter:

| Strategy | WebP Quality | Size Reduction | Best For |
|----------|:---:|:---:|----------|
| `quality` | 95 + lossless optimization | ~15–25% vs JPEG | Premium content, cover images, portraits |
| `balanced` _(recommended)_ | 85 | ~30–40% vs JPEG | General catalog images — 95% of use cases |
| `size` | 75 | ~50–60% vs JPEG | Thumbnails, previews, non-critical content |

---

## API

The service exposes **internal-only routes** under `/api/v1/internal` (JWT-protected).

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/internal/__debug__/raise-api-error` | Forces a test `ApiError` (HTTP 418) — debug only |

> Job trigger endpoints are in progress. Normalization is currently triggered via the scheduler.

---

## Configuration

Copy the example env file and adjust values:

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

---

## Local Development

### Prerequisites

- Python 3.13+
- [`uv`](https://github.com/astral-sh/uv) package manager
- PostgreSQL instance (local or Docker)
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
  unit/         ← Pure logic, framework-free (image operation correctness)
  integration/  ← Adapter + repository interactions
  e2e/          ← Full flow against a real database
  fixtures/     ← Shared test images and data factories
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

Testing image adapters in isolation is straightforward — each adapter receives `bytes | BytesIO` and returns `bytes`, with no external dependencies.

---

## Deployment

The service is containerized and deployed to Kubernetes.

### Build Docker image

```bash
make build
```

Multi-stage build: `uv`-based dependency resolution → minimal `python:3.13-slim` runtime. Non-root user (`appuser`, UID 10001), port **8000**.

### Push to registry

```bash
make push-service
```

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
| Image processing | Pillow 10+ |
| Async I/O | `asyncio.to_thread` (non-blocking PIL ops) |
| Database | PostgreSQL (asyncpg · psycopg3 · SQLAlchemy 2) |
| Migrations | Alembic |
| Validation | Pydantic v2 |
| Package manager | uv |
| Container | Docker (multi-stage build) |
| Orchestration | Kubernetes |
| Auth | JWT (`pyjwt`) |
| Testing | pytest · pytest-asyncio · pytest-mock |
| Internal packages | `monstrino-core` · `monstrino-models` · `monstrino-repositories` · `monstrino-api` · `monstrino-infra` · `monstrino-contracts` · `monstrino-testing` |
