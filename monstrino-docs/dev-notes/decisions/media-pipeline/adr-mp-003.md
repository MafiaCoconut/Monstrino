---
id: adr-mp-003
title: "ADR-MP-003: Split Media Pipeline into Subscriber and Processor"
sidebar_label: "MP-003: Subscriber/Processor Split"
sidebar_position: 3
tags: [media-pipeline, services, subscriber, processor, decomposition]
---

# ADR-MP-003 — Split Media Rehosting Pipeline into Subscriber and Processor

| Field      | Value                                                                  |
| ---------- | ---------------------------------------------------------------------- |
| **Status** | Accepted                                                               |
| **Date**   | 2025-07-01                                                             |
| **Author** | @monstrino-team                                                        |
| **Tags**   | `#media-pipeline` `#services` `#subscriber` `#processor` `#decomposition` |

## Context

The original `media` service combined two distinct concerns:

1. **Discovery** — detecting new releases that need their images downloaded (subscriber to catalog events or database polling).
2. **Processing** — actually downloading, transforming, and storing images in S3.

As the service grew, mixing these responsibilities made it harder to scale, monitor, and maintain each concern independently.

## Options Considered

### Option 1: Keep a Single Media Service

One service handles both discovery and processing.

- **Pros:** Simpler deployment, one codebase.
- **Cons:** Cannot scale discovery and processing independently, harder to monitor each concern separately, mixed failure modes.

### Option 2: Split into Subscriber and Processor ✅

- **`media-rehosting-subscriber`** — monitors the catalog for releases needing media processing, creates `media_ingest_job` records.
- **`media-rehosting-processor`** — reads jobs from the queue, downloads images, uploads to S3, marks jobs complete.

- **Pros:** Independent scaling, clear single responsibility per service, separate failure modes.
- **Cons:** Additional service to deploy and monitor.

## Decision

> The media rehosting pipeline is split into two services:
>
> - **`media-rehosting-subscriber`** — discovery and job creation.
> - **`media-rehosting-processor`** — image download, transformation, and S3 upload.

## Consequences

### Positive

- Each service can be scaled independently (more processors if download queue grows).
- Failures in processing don't affect discovery, and vice versa.
- Clearer operational monitoring per concern.

### Negative

- Two services to deploy and maintain instead of one.

## Related Decisions

- [ADR-MP-004](./adr-mp-004.md) — Media ingestion jobs table
- [ADR-MP-001](./adr-mp-001.md) — Image rehosting decision
