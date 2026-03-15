---
title: Storage Architecture
sidebar_position: 5
description: PostgreSQL, S3, Kafka, and Redis storage systems powering Monstrino.
---

# Storage Architecture

Monstrino uses multiple storage systems designed for different types of data.  
Each storage layer is optimized for a specific workload such as structured catalog data, media assets, ingestion pipelines, and processing jobs.

The architecture separates:

- structured relational data
- media asset storage
- ingestion and processing data
- market observations
- event messaging
- caching

This separation allows Monstrino to scale ingestion pipelines, media processing, and API serving independently.

---

# Storage Systems Overview

Monstrino currently uses the following storage technologies:

| Storage | Technology | Purpose |
|-------|-------|-------|
| Relational database | PostgreSQL | primary structured data storage |
| Object storage | S3 compatible | media assets, source payload snapshots |
| Event streaming | Kafka | processing events |
| Cache | Redis | API response caching |

---

# Relational Storage (PostgreSQL)

PostgreSQL is the primary structured data storage used by Monstrino.

Each deployment environment has its own database instance.

Environments:

- local
- test
- production

Within each database, data is organized using **separate schemas** to isolate functional domains.

Major storage domains include:

### Catalog Domain

Stores the normalized catalog of collectible entities.

Includes entities such as:

- releases
- characters
- pets
- series
- relationships between these entities
- metadata describing product relationships

The catalog schema represents the **core domain model of the platform**.

---

### Core Reference Data

Stores reference and classification data used across the system.

Examples include:

- countries
- currencies
- source types
- source technologies
- system reference data

This schema provides shared reference values used by other schemas.

---

### Ingestion (Cross-Cutting Technical Infrastructure)

The `ingest` schema is reserved for **cross-cutting technical infrastructure** shared across pipelines.

Typical stored data includes:

- outbox events
- worker leases
- scheduler bookkeeping
- dead-letter records

The `ingest` schema does **not** store operational pipeline tables such as `source_discovered_entry`, `source_payload_snapshot`, `ingest_item`, or `ingest_item_step` — these belong in the `catalog` schema alongside canonical catalog entities.

---

### Catalog Pipeline Operational Tables

All catalog pipeline lifecycle objects live in the **`catalog` schema** alongside canonical entities.

These objects include:

- `source_discovered_entry` — records of discovered release candidates
- `source_payload_snapshot` — raw source payloads fetched by the collector
- `ingest_item` — normalized work unit with `parsed_payload` and `enriched_payload`
- `ingest_item_step` — tracks stage progression through the enrichment pipeline

This co-location reflects the fact that the pipeline is a domain-internal concern of the catalog domain, not a separate technical layer.

---

### AI Domain

Stores AI pipeline execution state for all AI jobs.

Tables include:

- `ai_job` — top-level job record per enrichment request
- `ai_text_job` / `ai_image_job` — modality-specific job records
- `ai_job_model_call` — individual LLM/model call records
- `ai_job_action_log` — action-level execution log
- `ai_job_status_history` — status transition log
- `ai_job_intake_log` — intake validation log
- `ai_job_dispatch` — dispatch state for result delivery

The `ai` schema is **entirely private to the AI pipeline**. No other domain accesses these tables directly. Coordination with the catalog pipeline happens exclusively through Kafka.

---

### Admin Domain

Stores admin alert and review workflow records.

Tables include:

- `admin_alert` — materialized admin alert
- `admin_alert_delivery` — delivery state per alert
- `admin_alert_suppression_rule` — suppression rules for deduplication
- `admin_review_request` — review request records requiring human decision
- `admin_review_option` — available decision options per request
- `admin_review_response` — human decision responses
- `admin_review_dispatch` — dispatch state for decision propagation
- `admin_review_application` — application status of applied decisions

---

### Market Data

Stores market observations and pricing data.

Examples include:

- observed product prices
- MSRP information
- marketplace references

This schema allows Monstrino to track historical price data independently from the catalog.

---

### Media Metadata

Stores metadata describing media assets.

Examples include:

- media asset identifiers
- relationships between images and catalog entities
- ingestion jobs
- metadata for processed images

Actual image files are **not stored in PostgreSQL**.  
Only metadata and references are stored.

---

# Object Storage

All media assets are stored in **S3 compatible object storage**.

Environment configuration:

| Environment | Storage |
|------|------|
| local / test | MinIO |
| production | STACKIT S3 |

The object storage contains:

- original downloaded images
- normalized images
- resized variants
- optimized web formats
- source payload snapshots (raw payloads collected from external sources)

Images are processed by the **media-normalizator service** before being stored.

Multiple variants of the same image may exist, but all are linked to a single media asset identifier.

---

# Media Processing Storage

Media ingestion and processing are coordinated using database-driven jobs.

A dedicated job entity tracks the state of each media processing task.

Typical processing states include:

- init
- processing
- completed
- failed

Jobs are processed by services such as:

- media rehosting pipeline
- media-normalizator

All processed images remain linked to the same internal media asset identifier.

---

# Event Streaming

Monstrino uses **Kafka** for asynchronous communication between ingestion and processing pipelines.

Kafka is used across multiple platform pipelines:

**Media ingestion**
- `catalog-importer` → `media-rehosting-subscriber`: new image events triggering media ingestion

**AI enrichment**
- `catalog-data-enricher` → `ai-intake-service`: `ai.job.requested`
- `ai-intake-service`: `ai.job.requested.dlq` (dead-letter)
- `ai-job-dispatcher-service` → `catalog-data-enricher`: `catalog-enricher.attribute-result`

**Admin alert pipeline**
- `admin.alert.required`
- `admin.message.dispatch.required`
- `admin.message.dispatch.completed`

**Admin review pipeline**
- `admin.review.required`
- `admin.review.decision.submit`
- `admin.review.decided`
- `admin.review.applied`

---

# Caching Layer

Redis is used as a caching layer.

Primary use case:

- caching responses from internal API services

This reduces repeated database queries and improves API performance.

---

# Data Flow Overview

The general flow of data through Monstrino is:

1. External sources provide raw data.
2. Ingestion services collect and store the data in the ingestion schema.
3. Processing services normalize the data.
4. Normalized entities are stored in the catalog schema.
5. Images are downloaded and stored in object storage.
6. Media processing services generate optimized image variants.
7. APIs read normalized catalog data and media metadata.

---

# Data Lifecycle

The lifecycle of most data in Monstrino follows these stages:

1. **Collection**

   Data is collected from external sources.

2. **Raw storage**

   Raw responses are stored in ingestion tables.

3. **Normalization**

   Parsing and normalization services transform raw data into structured entities.

4. **Catalog integration**

   Clean entities are stored in catalog schemas.

5. **Media ingestion**

   Images are downloaded and stored in object storage.

6. **Media processing**

   Image variants are generated.

7. **API serving**

   Catalog and media data are served through API services.

---

# Storage Design Principles

Monstrino storage architecture follows several design principles.

### Separation of concerns

Different storage systems are used depending on the type of data.

### Normalized domain model

All catalog data is normalized before becoming part of the core catalog.

### Media independence

All images are stored internally rather than referenced from external platforms.

This guarantees long-term availability even if external sources become unavailable.

### Processing pipelines

Data ingestion and processing pipelines operate independently from the storage layer.

---

# Future Storage Evolution

Future versions of Monstrino will expand storage capabilities.

Possible future improvements include:

- CDN distribution for media assets
- extended event-driven pipelines
- scalable media processing infrastructure
- additional market data sources

The architecture is designed to support platform growth as the catalog expands.

Current estimated data scale:

- releases: 1000+
- characters: 130+
- pets: 40+
- series: 100+
- images: 100 000+
