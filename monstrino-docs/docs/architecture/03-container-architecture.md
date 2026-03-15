---
title: Container Architecture
sidebar_position: 3
description: Container-level architecture of the Monstrino platform (C4 Model Level 2).
---

# Container Architecture

## Overview

This document describes the **container-level architecture** of the Monstrino platform.

In C4 terminology this corresponds to **C4 Model – Level 2 (Container Diagram)**.

At this level we show:

- the main runtime components (services)
- how they interact with each other
- the primary storage systems
- the boundary between internal and external access

The goal is to explain **how the system is decomposed into independently deployable services**.

---

## Architectural Structure

The Monstrino platform is structured around several groups of services:

| Group | Responsibility |
|------|------|
| Acquisition | Collect raw data from external sources |
| Processing | Transform parsed data into normalized domain entities |
| Media | Store and process release images |
| APIs | Provide structured access to internal data |
| Gateway | Expose a single public entry point for the frontend |
| Storage | Persist structured data and media assets |

Each group contains services responsible for a clearly defined part of the system.

<!-- ---

## Container Diagram

![alt text](/img/architecture/container-architecture.jpg) -->

---

## Service Groups

### Gateway

`public-api-service`

The gateway is the **single externally accessible service**.

Responsibilities:

- validate incoming requests
- authenticate requests
- route requests to internal APIs
- transform responses into UI-ready DTOs

This pattern isolates the frontend from internal topology changes.

---

### API Services

API services expose structured data to other services and the public API gateway.

| Service | Responsibility |
|------|------|
| catalog-api-service | access to catalog domain data |
| market-api-service | access to pricing data |
| media-api-service | access to media metadata |

These services operate as **read APIs** over normalized data.

---

### Processing Services

Processing services transform collected data into the domain model.

| Service | Responsibility |
|------|------|
| catalog-importer | reads `ingest_item.enriched_payload` and writes normalized domain entities; publishes media image events to Kafka |
| catalog-data-enricher | claims `ingest_item_step` records, resolves attributes via built-in scripts, publishes `ai.job.requested` to Kafka for unresolved attributes, consumes `catalog-enricher.attribute-result` results, writes final `enriched_payload` |
| ai-intake-service | consumes `ai.job.requested` events, validates them, and creates `ai_job` + `ai_text_job` / `ai_image_job` records in the `ai` schema |
| ai-orchestrator | claims and executes AI workflows against modality job records using `SELECT FOR UPDATE SKIP LOCKED`; no shared tables with the catalog pipeline |
| ai-job-dispatcher-service | picks up completed AI jobs and publishes results to `catalog-enricher.attribute-result` Kafka topic |

These services implement the **core transformation pipeline**.

---

### Acquisition Services

Acquisition services collect data from external sources.

| Service | Responsibility |
|------|------|
| catalog-source-discovery | scans source surfaces, applies domain rules, produces `source_discovered_entry` records |
| catalog-content-collector | claims eligible entries, fetches payloads, creates `ingest_item` work units |
| market-price-collector | collects pricing observations |

Collected data moves through explicit lifecycle objects before processing.

---

### Media Services

Media services manage image ingestion and processing.

| Service | Responsibility |
|------|------|
| media-rehosting-subscriber | generate ingestion-job from kafka message |
| media-rehosting-processor | downloads and stores original images |
| media-normalizator | generates normalized image variants |

This subsystem ensures consistent media quality and storage.

---

### Admin and Alerting Services

Admin services handle operational alerts and review workflows triggered by pipeline failures or review-required conditions.

| Service | Responsibility |
|------|------|
| platform-alerting-service | receives alert requests from pipeline services via HTTP API and forwards them into the admin pipeline |
| admin-alert-service | materializes admin alerts, manages delivery state, publishes dispatch events to Kafka |
| admin-telegram-gateway | consumes dispatch events, sends Telegram notifications, publishes delivery confirmations; initiates outbound connections to Telegram |
| admin-review-service | stores and manages admin review requests and decisions |
| admin-api-service | unified admin-facing read API; publishes review decision commands to Kafka |

---

## Storage Systems

The platform uses multiple storage systems for different responsibilities.

| Storage | Purpose |
|------|------|
| PostgreSQL | structured domain data |
| Object Storage (S3 / MinIO) | image storage |
| Kafka | asynchronous event delivery |

Storage separation improves scalability and fault isolation.

---
---

## Communication Model

Services communicate primarily through **internal HTTP APIs**.

Characteristics:

- service-to-service API calls
- Bearer token authentication
- shared API configuration through `monstrino-api`
- shared contracts through `monstrino-contracts`

Some workflows also use **asynchronous event communication** through Kafka.

This is used for:

- media ingestion events (catalog-importer → media pipeline)
- AI enrichment requests and results (`ai.job.requested`, `catalog-enricher.attribute-result`)
- admin alert dispatch and delivery confirmations
- admin review decision commands and outcomes

---

## Security Boundary

Only the **public-api-service** is accessible from outside the cluster.

All other services:

- run inside Kubernetes
- are not directly exposed to the internet
- communicate only through internal networking

This ensures a clear separation between **public access and internal services**.

<!-- ---

 ## Relationship to Other Architecture Documents

Additional architectural documentation expands on specific parts of the system:

- [Architecture Overview](./architecture-overview.md) - high-level system description
- [System Context](./system-context.md) - external system environment
- [Storage Architecture](./storage-architecture.md) - storage design
- [Domain Model](./domain-model.md) - core domain entities and relations
- [Service Communication](./service-communication.md) - inter-service communication model
- [Security Boundaries](./security-boundaries.md) - access control and security model
- [Design Principles](./design-principles.md) - architectural principles and decisions
- `catalog-ingestion-pipeline.md` - data ingestion pipeline *(planned)*
- `media-pipeline.md` - media processing architecture *(planned)*

Together these documents provide a complete architectural view of the Monstrino platform. -->