---
id: adr-mp-002
title: "ADR-MP-002: S3-Compatible Object Storage"
sidebar_label: "MP-002: S3-Compatible Storage"
sidebar_position: 2
tags: [media-pipeline, storage, s3, minio, portability]
description: "Uses S3-compatible object storage (MinIO in homelab) to enable portable image storage that can migrate to managed cloud providers without code changes."
---

# ADR-MP-002 — Use S3-Compatible Object Storage

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| **Status** | Accepted                                                     |
| **Date**   | 2026-01-10                                                   |
| **Author** | @Aleks                                              |
| **Tags**   | `#media-pipeline` `#storage` `#s3` `#minio` `#portability`  |

## Context

Monstrino runs in a homelab environment but needs a storage solution that could be migrated to a managed cloud provider without significant code changes if the project grows. The storage must support:

- Large binary objects (images).
- URL-based access for serving catalog assets.
- Affordable operation at small scale.

## Options Considered

### Option 1: Local Filesystem Storage

Store images directly on disk, served via nginx.

- **Pros:** Zero infrastructure cost, simple.
- **Cons:** Not portable, no managed redundancy, no cloud migration path.

### Option 2: Proprietary Cloud Storage (AWS S3, GCS, Azure Blob)

Use a specific cloud provider directly.

- **Pros:** Fully managed, high durability.
- **Cons:** Vendor lock-in, cost at small scale, cannot run locally.

### Option 3: S3-Compatible API with MinIO Locally ✅

Target the S3 API in all code. Run MinIO locally. Any S3-compatible cloud service can be swapped in without code changes.

- **Pros:** Zero vendor lock-in, runnable locally in homelab (MinIO), cloud migration is a configuration change.
- **Cons:** S3 API has some complexity, MinIO adds infrastructure component.

## Decision

> All storage operations use the **S3-compatible API**. Locally and in development, **MinIO** is used as the S3-compatible server. In production or cloud migration, any S3-compatible service (AWS S3, Backblaze B2, Cloudflare R2) can be swapped in.

## Consequences

### Positive

- No vendor lock-in at the application level.
- Local development mirrors production storage behavior.
- Cloud migration is a simple configuration change.

### Negative

- MinIO adds an additional service to the homelab infrastructure.

## Related Decisions

- [ADR-MP-001](./adr-mp-001.md) — Image rehosting into Monstrino storage
- [ADR-IP-001](../infra-platform/adr-ip-001.md) — k3s homelab deployment
