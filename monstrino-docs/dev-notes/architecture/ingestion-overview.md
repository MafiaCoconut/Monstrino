---
id: architecture-ingestion-overview
title: Architecture Ingestion Overview
sidebar_label: Ingestion Overview
---

:::info
This document provides a **high-level architectural view** of the Monstrino system.
It explains *what the system is*, *how it is structured*, and *why these boundaries exist*.
:::

---

## System Purpose

Monstrino is a data-centric platform designed to build and maintain a **reliable, inspectable archive
of product releases** in a domain where source data is fragmented, inconsistent, and often manually curated.

The primary goal of the system is **data correctness and long-term maintainability**, not rapid feature delivery.

---

## Core Architectural Idea

The architecture is built around a single principle:

> **External data must never directly enter the domain.**

All data coming from outside the system is treated as:
- potentially incomplete,
- potentially inconsistent,
- potentially incorrect.

As a result, ingestion is designed as a **multi-stage pipeline** with explicit boundaries.

---

## High-Level Structure

At a high level, the system is composed of four layers:

1. **External Sources**  
   Websites, APIs, and other third-party data providers.

2. **Acquisition Layer**  
   Responsible for fetching and parsing external data into a stable internal format.

3. **Domain Population Layer**  
   Responsible for validating, transforming, and importing parsed data into canonical domain entities.

4. **Read / Consumption Layer**  
   Responsible for exposing validated domain data to consumers.

---

## Service Responsibilities

### catalog-collector

- Connects to external sources.
- Parses and normalizes source-specific data.
- Persists results into parsed tables.
- Never writes to canonical domain tables.

---

### catalog-importer

- Reads unprocessed parsed records.
- Applies domain rules and invariants.
- Coordinates domain services for transformation.
- Writes only validated data into canonical tables.

---

### release-catalog-service (planned)

- Exposes read-only access to canonical release data.
- Acts as a stable consumer-facing boundary.
- Does not participate in ingestion or transformation.

---

## Data Flow Overview

```text
External Source
      ↓
catalog-collector
      ↓
parsed_* tables
      ↓
catalog-importer
      ↓
canonical domain tables
      ↓
release-catalog-service
```

This flow ensures that:
- ingestion errors are isolated early,
- domain corruption is prevented,
- data can be inspected at each stage.

---

## Data Ownership and Boundaries

- **Parsed tables** are owned by the acquisition process.
- **Canonical tables** are owned by the domain.
- Only the importer is allowed to cross this boundary.

This separation allows:
- safe reprocessing,
- manual inspection and correction,
- controlled evolution of domain schemas.

---

## Consistency Model

The system explicitly favors:

- **eventual consistency** over real-time guarantees,
- **idempotent batch processing** over streaming pipelines,
- **observability and debuggability** over raw throughput.

These choices reflect the nature of the data and the operational environment.

---

## Shared Packages

To avoid duplication and enforce consistency, several shared packages exist:

- **monstrino-core** — domain primitives and interfaces
- **monstrino-repositories** — persistence abstractions and repositories
- **monstrino-infra** — shared infrastructure helpers
- **monstrino-api** — shared API-layer utilities

Each package has clearly documented responsibilities and constraints.

---

## What This Architecture Optimizes For

- Data correctness over speed
- Explicit boundaries over convenience
- Controlled evolution over rapid iteration
- Manual inspection over blind automation

---

## What This Architecture Does Not Optimize For

- Real-time ingestion
- Low-latency updates
- Minimal number of services
- Rapid feature experimentation

These trade-offs are intentional and documented elsewhere.

---

:::note
This overview describes the **current architectural shape** of the system.
Specific decisions and their consequences are documented in ADRs and Trade-offs.
:::