---
id: system-overview
title: System Overview
sidebar_label: System Overview
---

:::info
This document describes Monstrino as a **system**, not a single subsystem.
It intentionally stays at a high level and separates:
- what exists today,
- what is planned,
- and what is explicitly out of scope.
:::

---

## Purpose

Monstrino is a long-lived, data-centric platform for building and maintaining a **reliable catalog**
of releases in a domain where information is fragmented, inconsistent, and often manually curated.

The system is designed to prioritize:

- correctness and maintainability of the catalog data,
- transparent ingestion and transformation of external sources,
- a stable foundation for future user-facing experiences.

---

## What Monstrino Is

At a system level, Monstrino is composed of several subsystems:

1. **Data Acquisition and Ingestion**  
   Bringing external data into the system through a controlled, inspectable pipeline.

2. **Canonical Catalog Domain**  
   The validated, invariant-driven representation of releases and related entities.

3. **Read / Presentation Layer**  
   Services and UI that expose the canonical catalog to consumers.

4. **Platform and Shared Foundations**  
   Cross-cutting packages and infrastructure patterns that keep services consistent.

Some subsystems are already mature; others are actively being built.

---

## Current System Focus

Today, the system’s primary focus is:

- building a robust ingestion pipeline,
- stabilizing canonical catalog models,
- ensuring the catalog can be extended without fragile refactors.

User features are intentionally secondary until the catalog foundation is stable.

---

## System Boundaries

Monstrino explicitly treats external data as untrusted.

A key system boundary is:

> External data must not directly enter canonical domain tables.

Instead, ingestion is mediated through parsed data buffers and importer logic.
Subsystem-level details are documented in the ingestion overview.

---

## Subsystems and Responsibilities

### 1. Data Acquisition and Ingestion

**Goal:** Acquire external data safely and transparently.

- External parsing and normalization
- Parsed record storage for inspection
- Controlled, batch-oriented processing into canonical models

Primary actors:
- catalog-collector
- catalog-importer

---

### 2. Canonical Catalog Domain

**Goal:** Maintain a trustworthy internal representation of releases.

- Domain invariants and normalization
- Stable identifiers and relations
- Canonical storage for read-only consumption

This subsystem is fed only through the importer boundary.

---

### 3. Read / Presentation Layer

**Goal:** Provide consumers with reliable access to catalog data.

- read-oriented service boundaries
- UI and presentation logic (thin, consumer-focused)
- stable response semantics for clients

Planned primary actors:
- release-catalog-service (read boundary)
- UI services

---

### 4. Platform and Shared Foundations

**Goal:** Reduce duplication and keep architecture consistent across services.

- shared domain primitives (monstrino-core)
- shared repositories and transaction helpers (monstrino-repositories)
- shared infra utilities (monstrino-infra)
- shared API conventions (monstrino-api)
- shared testing infrastructure (monstrino-testing)

These packages provide structure and guardrails, not business features.

---

## Consistency and Runtime Model

Monstrino favors:

- eventual consistency across subsystems,
- batch processing with explicit states,
- debuggability and inspection over opaque automation.

This reflects the reality of external sources and the need for safe correction workflows.

---

## What Is Planned (Not Yet Stable)

The following are part of the intended system shape but are not yet considered stable:

- a dedicated read service with stable consumer guarantees
- production-grade UI and UX
- user accounts, collections, and social features
- media ingestion and ownership at scale

Planned does not mean promised; these items evolve as the system matures.

---

## Non-Goals (System Level)

Monstrino is explicitly not trying to be:

- a real-time streaming ingestion platform,
- a general-purpose social network first,
- a system optimized for maximum throughput,
- a platform that trusts external sources without verification.

---

:::note
Subsystem-level architecture is documented separately.
If you want a concrete implementation view, start with:
- ingestion overview
- ADR collection
- service and package reality documents
:::