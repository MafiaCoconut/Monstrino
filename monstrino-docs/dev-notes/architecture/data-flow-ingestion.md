---
id: data-flow-ingestion
title: "Data Flow: Ingestion"
sidebar_label: "Data Flow: Ingestion"
sidebar_position: 4
description: How data moves from external sources through the Monstrino ingestion pipeline to persistent storage.
---

# Data Flow: Ingestion

:::info
This document provides a high-level view of how data flows through the ingestion pipeline - from external sources to normalized platform storage.
:::

---

## Overview

The ingestion pipeline **collects information from external sources** and transforms it into normalized, validated records that the rest of the platform can rely on.

---

## Pipeline Stages

Data moves through the following stages in sequence:

| Stage | Description |
|---|---|
| **1. Discovery** | identify new or updated content on external sources |
| **2. Parsing** | extract structured fields from raw source data |
| **3. AI Enrichment** | fill gaps and resolve ambiguities using LLM-assisted processing |
| **4. Validation** | verify extracted values for plausibility and completeness |
| **5. Persistence** | write normalized records into the appropriate storage zone |

Not every item goes through every stage - clean, well-structured sources may skip enrichment entirely.

---

## Visualized Flow

```
External Source
    → Discovery (collector service)
        → Raw Payload Storage (ingest zone)
            → Parser
                → AI Enrichment (optional)
                    → Validation
                        → Normalized Persistence (catalog zone)
```

---

## Pipeline Characteristics

| Characteristic | Notes |
|---|---|
| **Asynchronous** | no ingestion work happens in synchronous request paths |
| **Multi-stage** | stages are separated with explicit job state between them |
| **Fault tolerant** | failures are isolated per job; one failed item does not block others |
| **Idempotent** | pipelines can be safely re-run on the same source input |

---

## Storage Zone Separation

A critical aspect of ingestion is the **hard separation between zones**:

| Zone | Contains |
|---|---|
| **Ingest zone** | raw payloads, parsed source-shaped data, job state |
| **Catalog zone** | normalized canonical entities (releases, characters, series) |

Source data never goes directly to the catalog zone. It always passes through the ingest zone first.

:::note
This separation is an architectural decision. See [ADR-DI-001](../decisions/data-ingestion/adr-di-001) for the full rationale.
:::

---

## Related Documents

- [Pipelines Overview](/docs/pipelines/overview) - detailed pipeline mechanics and conventions,
- [Catalog Ingestion Pipeline](/docs/pipelines/data-ingestion/catalog-ingest/overview) - the specific pipeline for catalog data,
- [Service Boundaries](./service-boundaries) - how domain ownership applies to ingestion stages,
- [AI Data Enrichment Strategy](../ai/ai-data-enrichment) - how the enrichment stage works.
