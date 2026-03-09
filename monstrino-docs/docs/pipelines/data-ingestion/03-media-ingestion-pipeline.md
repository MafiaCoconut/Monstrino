---
title: Media Ingestion Pipeline
sidebar_position: 3
description: Detailed media ingestion and normalization pipeline for image assets in the Monstrino platform.
---

# Media Ingestion Pipeline

## Scope

This document describes the media-specific ingestion and normalization flow of the Monstrino platform.

It focuses on:

- image-processing triggers from upstream pipelines
- rehosting of externally discovered images
- creation of canonical media asset records
- attachment of images to domain entities
- generation of normalized variants and derived formats

For the high-level ingestion overview see `ingestion-architecture.md`.

---

## Overview

The media ingestion pipeline is responsible for turning externally discovered image URLs into reusable, normalized media assets that can be safely stored, referenced, and served by the platform.

The pipeline is intentionally separated from the catalog ingestion flow so that:

- release normalization is not blocked by image-heavy processing
- media-specific retry logic can evolve independently
- image storage and transformation rules remain reusable across future domains
- downstream image workflows can expand without redesigning catalog import

At a high level, the pipeline consists of three stages:

1. Media rehosting subscription
2. Media rehosting processing
3. Media normalization

---

## High-Level Media Ingestion Flow

![](/img/pipelines/media-ingastion-pipeline.jpg)

---

## Stage 1 - Media Rehosting Subscriber

### Purpose

This stage receives image-processing events and converts them into durable ingestion jobs.

Instead of processing images immediately, the system first creates a `MediaIngestionJob` record that can be processed asynchronously.

### Trigger

The service subscribes to a Kafka topic that contains image-related events produced by upstream services.

### Processing Flow

1. The service listens to the Kafka topic containing image events.
2. When a new event is received, it extracts image metadata and ownership information.
3. A new `MediaIngestionJob` record is created.
4. The job is stored in the database with `processing_state = init`.

### Output

A persisted `MediaIngestionJob` ready for downstream processing.

---

## Stage 2 - Media Rehosting Processor

### Purpose

This stage downloads the original image, deduplicates it, stores it in object storage, and creates canonical asset records.

### Trigger

A scheduler periodically invokes `IngestExternalMediaUseCase`.

### Processing Flow

1. The use case retrieves all `MediaIngestionJob` records with `processing_state = init`.
2. For each job, the image is downloaded using the internal `Downloader` component.
3. The downloader returns normalized file metadata:

```python
class DownloadedFile:
    content: bytes
    sha256_hex: str
    content_type: str
    byte_size: int
    width: Optional[int]
    height: Optional[int]
    original_filename: Optional[str]
    ext: Optional[str]
    image_format: Optional[str]
```

4. The system checks whether the same file already exists using `sha256_hex`.
5. If it is new, metadata is attached to the job record.
6. The system checks if the file already exists in `MediaAsset`.
7. If not present, a `storage_key` is generated.
8. The image is uploaded to S3-compatible storage using `S3Storage`.
9. A canonical `MediaAsset` record is created.
10. A `MediaAttachment` record is created describing the ownership of the image.

### Attachment Model

`MediaAttachment` stores ownership metadata such as:

- owner_service
- owner_type
- owner_id
- owner_ref

This allows the platform to retrieve images for specific entities such as releases, characters, or pets.

### Output

- Stored original image in S3
- Canonical `MediaAsset`
- `MediaAttachment` linking the asset to platform entities

---

## Stage 3 - Media Normalization

### Purpose

This stage generates delivery-ready variants of stored images.

### Trigger

A scheduler invokes `ProcessNewImageUseCase` for `MediaAsset` records with `processing_state = init`.

### Processing Flow

1. The use case selects a new `MediaAsset` record.
2. The record is marked as `claimed`.
3. The original image is converted into additional formats such as:

- WEBP
- JPG

4. Each generated file is stored in `media_asset_variant`.
5. Multiple sizes of each format are generated for responsive delivery.
6. If the asset is marked as **primary** for a `release`, `character`, or `pet`, additional cropped variants may be generated for profile usage.
7. Some images containing multiple items may trigger an additional segmentation step which generates multiple variants linked to different attachments.

### AI-Assisted Processing

Certain image operations may call the `ai-orchestrator` service through the `ai-orchestrator-api-client` from the `monstrino-infra` package.

This can be used for:

- removing unnecessary background elements
- improving image quality
- extracting multiple objects from a single image

### Output

The stage produces:

- format variants
- resized variants
- optional AI-derived variants

All variants are stored in `media_asset_variant`.

---

## Design Principles

### Separation of Concerns

Media processing is separated from catalog ingestion so that heavy image operations do not block catalog processing.

### Canonical Asset Model

The pipeline distinguishes between:

- `MediaAsset` - canonical stored image
- `MediaAttachment` - ownership mapping
- `MediaAssetVariant` - derived representations

### Content Deduplication

Duplicate images are detected using `sha256` hashing.

### Scheduler-Based Processing

Both rehosting and normalization are scheduler-driven and controlled through processing states.
