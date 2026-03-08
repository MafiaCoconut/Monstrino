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

---

## Container Diagram

![alt text](/img/architecture/container-architecture.jpg)

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
| catalog-importer | converts parsed releases into normalized domain entities |
| catalog-data-enrichter | enriches parsed data using inference |
| llm-gateway | provides unified access to LLM inference |

These services implement the **core transformation pipeline**.

---

### Acquisition Services

Acquisition services collect data from external sources.

| Service | Responsibility |
|------|------|
| catalog-collector | fetches release information |
| market-price-collector | collects pricing observations |

Collected data is stored as parsed records before processing.

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

This is primarily used for:

- media processing pipelines
- background data processing

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

- [Architecture Overview](./architecture-overview.md) — high-level system description
- [System Context](./system-context.md) — external system environment
- [Storage Architecture](./storage-architecture.md) — storage design
- [Domain Model](./domain-model.md) — core domain entities and relations
- [Service Communication](./service-communication.md) — inter-service communication model
- [Security Boundaries](./security-boundaries.md) — access control and security model
- [Design Principles](./design-principles.md) — architectural principles and decisions
- `catalog-ingestion-pipeline.md` — data ingestion pipeline *(planned)*
- `media-pipeline.md` — media processing architecture *(planned)*

Together these documents provide a complete architectural view of the Monstrino platform. -->