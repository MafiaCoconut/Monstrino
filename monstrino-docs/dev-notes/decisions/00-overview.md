---
id: architecture-decisions
title: Architecture Decisions Index
sidebar_label: Decisions
sidebar_position: 1
---

:::info
This document acts as a **navigation and context map** for all Architecture Decision Records (ADR)
in the Monstrino project.

It does not restate decisions.
It explains **how individual decisions relate to each other** and where to find details.
:::

---

## How to Use This Document

- Start here to understand the **decision landscape** of the system.
- Follow links to individual ADRs for detailed reasoning.
- Use this index to see **why the architecture looks the way it does today**.

---

## Decision Areas Overview

Monstrino's architecture decisions are grouped into the following areas:

1. Product strategy and scope
2. Application architecture and code structure
3. Data ingestion and external boundaries
4. Domain model and data design
5. Media pipeline
6. AI and external data sources
7. Frontend delivery
8. Infrastructure and platform

Each area links to one or more ADRs.

---

## 1. Product Strategy & Scope

These decisions define what is being built, for whom, and in what order.

- **[ADR-PS-001 — Focus on Monster High](../product-strategy/adr-ps-001)**  
  Narrows the product domain to Monster High collectibles instead of broader collectible markets.

- **[ADR-PS-002 — Automated Data Acquisition as Core](../product-strategy/adr-ps-002)**  
  Makes automated acquisition the central product capability rather than manual curation.

- **[ADR-PS-003 — Release Archive First for MVP](../product-strategy/adr-ps-003)**  
  Scopes the MVP to the release archive, deferring social and user features.

- **[ADR-PS-004 — Defer Affiliate Monetization](../product-strategy/adr-ps-004)**  
  Keeps product integrity separate from revenue concerns during the early phase.

- **[ADR-PS-005 — Image Pipeline Before Price Collection](../product-strategy/adr-ps-005)**  
  Prioritizes visual catalog completeness over price tracking for the MVP.

---

## 2. Application Architecture & Code Structure

These decisions define how services are structured, layered, and share code.

- **[ADR-A-001 — Shared Packages for Cross-Service Code](../architecture/adr-a-001)**  
  Introduces shared Python packages to eliminate code duplication across microservices.

- **[ADR-A-002 — Restrict ORM Usage to Repositories](../architecture/adr-a-002)**  
  Confines SQLAlchemy ORM objects to the repository layer to prevent session state leakage.

- **[ADR-A-003 — UnitOfWork and BaseRepo Persistence](../architecture/adr-a-003)**  
  Defines a shared UnitOfWork and BaseRepository pattern for consistent session and transaction management.

- **[ADR-A-004 — Organize Services by Domain Capabilities](../architecture/adr-a-004)**  
  Structures the services directory by domain to clarify ownership and architectural intent.

- **[ADR-A-005 — Contracts → Command → Dispatcher API](../architecture/adr-a-005)**  
  Establishes a layered API pattern that decouples HTTP concerns from application logic.

- **[ADR-A-006 — Centralize Source Parsers in monstrino-infra](../architecture/adr-a-006)**  
  Moves all external source parsers into a shared package to avoid duplication across services.

---

## 3. Data Ingestion & External Data Handling

These decisions define how external, untrusted data enters the system and flows through the pipeline.

- **[ADR-DI-001 — Separate Ingestion from Canonical Catalog](../data-ingestion/adr-di-001)**  
  Uses parsed tables as a buffer between external source data and the canonical catalog schema.

- **[ADR-DI-002 — DB Processing State for Ingestion Workflows](../data-ingestion/adr-di-002)**  
  Tracks pipeline state in the database instead of with Kafka to simplify observability and retries.

- **[ADR-DI-003 — external_id as Main Ingestion Identifier](../data-ingestion/adr-di-003)**  
  Uses a stable `external_id` from the source instead of fragile URL-based keys.

- **[ADR-DI-004 — Idempotency via source + external_id](../data-ingestion/adr-di-004)**  
  Enforces a compound unique constraint on `(source, external_id)` to prevent duplicate ingestion.

- **[ADR-DI-005 — Parsed Models for Heterogeneous Sources](../data-ingestion/adr-di-005)**  
  Designs parsed models flexible enough to accommodate structurally different source providers.

- **[ADR-DI-006 — Parsed Content as Replayable JSON](../data-ingestion/adr-di-006)**  
  Stores the full raw payload as JSON to allow re-processing without data loss across schema changes.

---

## 4. Domain Model & Data Design

These decisions define how the canonical data model reflects the Monster High domain.

- **[ADR-DM-001 — Structure Database by Domain Schemas](../domain-model/adr-dm-001)**  
  Organizes PostgreSQL tables into domain-scoped schemas to prevent namespace pollution.

- **[ADR-DM-002 — Release External Reference System](../domain-model/adr-dm-002)**  
  Adds a structured many-to-one relation between external sources and canonical releases.

- **[ADR-DM-003 — Character Variant Concept](../domain-model/adr-dm-003)**  
  Introduces character variants to represent the same character across different franchise contexts.

---

## 5. Media Pipeline

These decisions define how product images are acquired, stored, and served.

- **[ADR-MP-001 — Rehost External Images into Monstrino Storage](../media-pipeline/adr-mp-001)**  
  Moves all images from external CDNs into Monstrino-controlled storage to guarantee availability.

- **[ADR-MP-002 — S3-Compatible Object Storage](../media-pipeline/adr-mp-002)**  
  Uses MinIO locally with an S3-compatible interface to enable future cloud migration without code changes.

- **[ADR-MP-003 — Split Media Pipeline into Subscriber and Processor](../media-pipeline/adr-mp-003)**  
  Separates event detection from image download into two independent services.

- **[ADR-MP-004 — Media Ingestion Jobs Table](../media-pipeline/adr-mp-004)**  
  Introduces a database jobs table to queue, track, and retry asynchronous media processing.

---

## 6. AI & External Data Sources

These decisions define how LLMs and official external sources are used for data enrichment.

- **[ADR-LS-001 — Isolate LLM Processing Behind llm-gateway](../ai-external-sources/adr-ls-001)**  
  Routes all LLM calls through a single internal gateway service to centralize model configuration.

- **[ADR-LS-002 — LLM-Assisted Normalization for Release Data](../ai-external-sources/adr-ls-002)**  
  Uses LLM inference to extract structured release data from inconsistent free-form product titles.

- **[ADR-LS-003 — Mattel Shopify as Primary MSRP Source](../ai-external-sources/adr-ls-003)**  
  Designates official Mattel Shopify stores as the authoritative source for MSRP price data.

---

## 7. Frontend Delivery

These decisions define how the catalog is delivered to end users.

- **[ADR-FD-001 — Migrate Frontend from Vite to Next.js](../frontend-delivery/adr-fd-001)**  
  Replaces the Vite SPA with Next.js to enable SSR and incremental static regeneration for SEO.

- **[ADR-FD-002 — Frontend in a Dedicated Repository](../frontend-delivery/adr-fd-002)**  
  Extracts the frontend into its own repository to isolate its build pipeline and tooling.

---

## 8. Infrastructure & Platform

These decisions define how the system is deployed and made accessible.

- **[ADR-IP-001 — Deploy on Single-Node k3s Cluster](../infra-platform/adr-ip-001)**  
  Uses k3s as a lightweight Kubernetes distribution suited to a single homelab machine.

- **[ADR-IP-002 — Publish Services Through Cloudflared](../infra-platform/adr-ip-002)**  
  Exposes internal services to the internet via Cloudflare Tunnel, bypassing CGNAT without a static IP.

---

## Reading Order Recommendation

For a first-time reader:

1. **ADR-PS-001** — understand the product domain and target niche
2. **ADR-PS-002** — understand the core product capability
3. **ADR-DI-001** — understand the ingestion boundary
4. **ADR-DI-002** — understand how the pipeline is orchestrated
5. **ADR-A-001** — understand the shared code structure
6. **ADR-A-005** — understand how APIs are structured internally
7. **ADR-IP-001** — understand the deployment context

This sequence explains the system from product intent through data flow to deployment.

---

:::note
Each ADR is a standalone document and represents a decision at a specific point in time.
Outdated decisions are preserved intentionally for historical context in the `archive_not_used` folder.
:::
