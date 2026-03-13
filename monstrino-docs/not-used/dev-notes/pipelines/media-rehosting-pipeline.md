---
id: media-rehosting-pipeline
title: Media Rehosting Pipeline
sidebar_label: Media Rehosting
description: Working notes for the pipeline that downloads external media and re-hosts it into Monstrino-managed storage.
---

# Media Rehosting Pipeline

:::info
Working notes for the pipeline responsible for **downloading externally referenced media files** and re-hosting them into Monstrino-managed object storage.
:::

---

## Purpose

This pipeline exists to make media delivery **more stable, controllable, and decoupled from third-party source availability**.

It takes externally referenced media files, turns them into internal ingestion jobs, downloads the original file, validates the result, and re-hosts the media into Monstrino-managed object storage.

---

## Pipeline Stages

The pipeline contains two explicit stages:

| Stage | Role |
|---|---|
| `media-rehosting-subscriber` | consumes Kafka events, creates ingestion jobs |
| `media-rehosting-processor` | scheduler-driven, executes actual download and storage |

---

## Stage 1: `media-rehosting-subscriber`

### Responsibility

This service subscribes to a Kafka topic and listens for events related to new external images.

### Main Action

When a relevant event is received, the subscriber creates a `MediaIngestionJob` record and stores it in the corresponding table.

### Why This Stage Exists

This stage isolates **event intake** from file download and storage work.

Benefits:

- lightweight topic consumer,
- durable queueing via database job record,
- easier retries,
- lower risk of losing work during processor outages.

### Expected Input

A Kafka message containing enough metadata to identify the external media target.

Typical fields:

| Field | Notes |
|---|---|
| `source_url` | URL of the external media file |
| `related_entity_type` | e.g., `release`, `character` |
| `related_entity_id` | internal ID of the related entity |
| `source_name` | which source produced this |
| `source_record_reference` | pointer back to the source record |
| `correlation_id` | traceability across services |
| `media_kind` | e.g., `product_image`, `thumbnail` |

### Expected Output

A persisted `MediaIngestionJob` with initial processing state `init`.

---

## Stage 2: `media-rehosting-processor`

### Responsibility

This service is **scheduler-driven** and executes the actual ingestion work.

### Main Action

On a schedule, the processor invokes `IngestExternalMediaUseCase`, which:

1. loads newly created `MediaIngestionJob` rows with `processing_state = init`,
2. downloads the target file through an internal `Downloader` component,
3. validates the download result,
4. persists media storage records,
5. uploads the file into internal storage,
6. updates job state.

---

## Download Step

The internal `Downloader` fetches the file from the external URL and returns a structured object.

Current minimal shape:

```python
class DownloadedFile:
    content: bytes
```

:::note
In practice, the returned object should contain richer metadata. See recommended fields below.
:::

Recommended full shape:

```python
@dataclass
class DownloadedFile:
    content: bytes
    content_type: str
    file_extension: str
    status_code: int
    original_filename: str | None
    content_length: int
    response_headers: dict[str, str]
    checksum: str | None  # SHA-256, if computed at download time
```

---

## Full Processing Flow

### 1. Select Pending Jobs

Query `MediaIngestionJob` records with `processing_state = init`.

### 2. Mark as Processing

:::warning
Before heavy work starts, transition the job to `processing` to **prevent duplicate parallel handling**.
:::

### 3. Download External File

Use `Downloader` to fetch file bytes and metadata from the external URL.

### 4. Validate File

Checks must include:

- response success (2xx),
- file is not empty,
- acceptable content type (e.g., `image/jpeg`, `image/webp`),
- within acceptable size limits,
- image is decodable,
- optional: MIME type consistency with declared content type.

### 5. Compute Technical Metadata

Derived metadata to compute and store:

| Field | Notes |
|---|---|
| `sha256_hash` | for deduplication and integrity |
| `width` | image width in pixels |
| `height` | image height in pixels |
| `format` | e.g., `JPEG`, `PNG`, `WEBP` |
| `file_size` | in bytes |
| `extension` | normalized file extension |

### 6. Upload into Managed Storage

Upload the file into Monstrino-controlled object storage (e.g., MinIO or environment-specific provider).

### 7. Persist Media Records

Create or update media-related tables describing:

- storage location,
- public or internal URL,
- provider and storage key,
- hash and dimensions,
- relation to release or source object.

### 8. Update Job State

Transition the job to a terminal or next-stage state.

---

## Processing States

| State | Meaning |
|---|---|
| `init` | job created, not yet processed |
| `processing` | currently being handled |
| `processed` | file downloaded, validated, and stored |
| `failed` | terminal failure |
| `retry_pending` | transient failure, waiting for retry |
| `invalid_media` | file failed validation, not retryable |

---

## Why Rehosting Matters

| Problem | How Rehosting Solves It |
|---|---|
| External URLs may disappear | internal copy is stable |
| Hotlinking may be unreliable | internal CDN under platform control |
| Technical metadata needed multiple times | computed once and reused |
| Moderation and variant generation | require internal ownership of media path |

---

## Storage Metadata

The pipeline should store the following metadata for each hosted file:

| Field | Notes |
|---|---|
| `provider` | storage provider name |
| `bucket` | object storage bucket |
| `storage_key` | unique path within the bucket |
| `original_source_url` | for traceability and debugging |
| `content_hash` | SHA-256 |
| `width` / `height` | image dimensions |
| `mime_type` | detected content type |
| `file_size` | in bytes |
| `created_at` | timestamp |
| `visibility_state` | e.g., `public`, `internal` |
| `moderation_state` | e.g., `pending`, `approved` |

---

## Failure Cases

:::warning
Typical failures to handle:

- network timeout,
- forbidden source response (403),
- invalid image bytes,
- unsupported content type,
- duplicate storage conflict,
- upload failure,
- database write failure.
:::

Recommended handling:

- retry transient transport failures,
- mark unrecoverable media as `invalid_media` or `failed`,
- **preserve original source URL** for debugging,
- never delete failed job history.

---

## Future Evolution

- image normalization variants (thumbnails, WebP conversion),
- background removal or enhancement,
- duplicate detection by content hash,
- moderation pipeline integration,
- multiple storage backends by environment,
- automatic thumbnail generation.
